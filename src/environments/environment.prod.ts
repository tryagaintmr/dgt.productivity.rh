export const environment = {
  production: true,
  mock: true,
  useSharePointContext: false,
  useDotnetWebApi: false,
  useVaubanRoles: false,
  devWebServiceDefaultBaseUrl: '<dev-spweb-url-prod/addin-name',
  adalConfig: {
    clientId: '<client-id-here>',
    tenant: '<tenant-guid-here>',
    cacheLocation: 'localStorage',
    endpoints: {
        api: '<client-id-here>'
    }
  }
};
