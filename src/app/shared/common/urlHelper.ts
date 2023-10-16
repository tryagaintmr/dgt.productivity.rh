/**
 * MAnipulate url string data
 *
 * @export
 */
export class UrlHelper {
  /**
   * Tests if a url param exists
   *
   * @param name The name of the url parameter to check
   */
    public static urlParamExists(name: string): boolean {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    return regex.test(location.search);
  }

  /**
   * Gets a url param value by name
   *
   * @param name The name of the parameter for which we want the value
   */
  public static getUrlParamByName(name: string): string {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /**
   * REturn true if a term in in the url hostname
   *
   */
  public static isInHostHeader(name: string): boolean {
    return window.location.hostname.includes(name);
  }

 

  public static formatUrl(title: string): string {
    return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().split(" ").join("_").replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
  }

}

