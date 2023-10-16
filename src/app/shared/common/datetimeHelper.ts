/**
 * MAnipulate url string data
 *
 * @export
 */
export class DateTimeHelper {
  static readonly monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc' ];

  // Renvoie le mois en lettre (monthNames)
  public static getMonth(dateString: string) {
    const dateObj = new Date(dateString);

    return this.monthNames[dateObj.getMonth()];
  }

  // Renvoie le jour en chiffre
  public static getDay(dateString: string) {
    const dateObj = new Date(dateString);
    return dateObj.getDate();
  }

  // Renvoie l'année en chiffre
  public static getYear(dateString: string) {
    const dateObj = new Date(dateString);
    return dateObj.getFullYear();
  }

  // Renvoie l'heure
  public static getTime(dateString: string) {
    const dateObj = new Date(dateString);
    const hour = dateObj.getUTCHours();
    const min = dateObj.getUTCMinutes();

    return hour.toString().padStart(2, "0") + 'h' + min.toString().padStart(2, "0");
  }


  // Format UTC
  public static getTimeZeroOffset(dateString: string) {
    const dateObj = new Date(dateString);
    const hour = dateObj.getUTCHours();
    const min = dateObj.getUTCMinutes();
    const sec = dateObj.getUTCSeconds();

    const hours = hour + ':'  + min + ':' + sec;
    const formatedHours = hours.split(':').map((item) => {
      return item.length < 2 ? '0' + item : item;
    }).join(':');

    return formatedHours;
  }

}

