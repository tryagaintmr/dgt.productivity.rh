/**
 * Manipulate url string data
 *
 * @export
 */
export class StringHelper {

  public static generateGuid() {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line: no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  public static nameInitialGenerator(data: any) {
    if (typeof data !== 'string') return '';
    return data
      .split(' ')
      .map((item: any) => {
        const firstLetter = item.charAt(0);
        return firstLetter.match(/[a-zA-Z]/) ? firstLetter.toUpperCase() : '';
      })
      .join('');
  }


  public static formatStorageUnit(value: number | null | undefined) {
    if (!value) { return '0 Mo'; }
    if (value <= 1) { return (value) * 100 + ' Mo'; }
    return (value - 1) + ' Go';
  }
}

