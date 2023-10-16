export const environment = {
  production: false,
  mock: true,
  useSharePointContext: false,
  useDotnetWebApi: false,
  useVaubanRoles: false,
  devWebServiceDefaultBaseUrl: '<dev-spweb-url-stag/addin-name',
  adalConfig: {
    clientId: '<client-id-here>',
    tenant: '<tenant-guid-here>',
    cacheLocation: 'localStorage',
    endpoints: {
        api: '<client-id-here>'
    }
  }
};
