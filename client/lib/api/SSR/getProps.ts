import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { IUser, QueryResponse } from '../../../config/types';
import env from '../../../config/env';
import fetcherSSR from './fetcherSSR';

interface IGetProps {
  context: GetServerSidePropsContext;
  // eslint-disable-next-line no-unused-vars
  fetcher: <T>(uri: string) => Promise<QueryResponse<T>>;
  user: IUser | null;
}

interface IRedirectProps{
  dstAuthorized?: string;
  dstUnathorized?: string;
}

export default function withUser <T1>(
  redirect?: IRedirectProps,
  // eslint-disable-next-line no-unused-vars
  getProps?: (params: IGetProps) => Promise<GetServerSidePropsResult<T1>>,
) {
  async function getServerSideProps(context: any): Promise<GetServerSideProps<T1>> {
    // fetcher may work with other data interface
    async function fetcher<T2>(uri: string) { return (fetcherSSR<T2>(context.req, context.res, uri)); }
    const { error, data: user } = await fetcher<IUser>(`${env.api}/user/get`);

    if (redirect) {
      if (error || !user) {
        return {
          // @ts-ignore
          redirect: { statusCode: 307, destination: redirect.dstUnathorized },
        };
      }
      return {
        // @ts-ignore
        redirect: { statusCode: 307, destination: redirect.dstAuthorized },
      };
    }

    const result = getProps
      ? await getProps({ context, fetcher, user })
      : {};
    const props = (result as any).props || {};

    // @ts-ignore
    return { ...result, props: { user, ...props } };
  }

  return getServerSideProps;
}