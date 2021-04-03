import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SimpleDateService {

  //stored as a NUMBER, seconds from origin time
  getTimeSeconds(): number {
    return Date.now();
  }

  //returns M/D/Y
  convertTimeToDisplay(timeInSeconds: number): string {
    let displayString = "";
    const fullDate = new Date(timeInSeconds);
    const month = fullDate.getMonth() + 1;
    const day = fullDate.getDate();
    const year = fullDate.getFullYear();

    //uses backwards US standard
    displayString += month + "/" + day + "/" + year;
    return displayString;
  }

  //returns M/D
  convertTimeToDisplayNoYear(timeInSeconds: number): string {
    let displayString = "";
    const fullDate = new Date(timeInSeconds);
    const month = fullDate.getMonth() + 1;
    const day = fullDate.getDate();

    //uses backwards US standard
    displayString += month + "/" + day;
    return displayString;
  }
}

//creationDateLong.toLocaleString("en-us", { month: "short" })); //0 indexed