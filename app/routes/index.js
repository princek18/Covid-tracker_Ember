import Route from "@ember/routing/route";
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class IndexRoute extends Route {
  @service fetchedData;
  @tracked totalConfirmed;
  @tracked totalRecovered;
  @tracked totalDeceased;
  states = {
    AN: "Andaman and Nicobar",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattishgarh",
    DL: "Delhi",
    DN: "Dadra and Nagar Haveli and Daman and Diu",
    GA: "Goa",
    GJ: "Gujarat",
    HP: "Himachal Pradesh",
    HR: "Haryana",
    JH: "Jharkhand",
    JK: "Jammu and Kashmir",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    MH: "Maharashtra",
    ML: "Meghalaya",
    MN: "Manipur",
    MP: "Madhya Pradesh",
    MZ: "Mozoram",
    NL: "Nagaland",
    OR: "Odisha",
    PB: "Punjab",
    PY: "Puducherry",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TG: "Telangana",
    TN: "Tamil Nadu",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
  };
  async model() {
    let response = await fetch("https://data.covid19india.org/v4/data.json");
    let data = await response.json();
    this.totalDeceased = data['TT']['total']['deceased'];
    this.totalConfirmed = data['TT']['total']['confirmed'];
    this.totalRecovered = data['TT']['total']['recovered'];

    let keys = Object.keys(this.states);
    let num = 1;
    for (const i of keys) {
      this.fetchedData.addData(num++, this.states[i], data[i]['total']['confirmed'], data[i]['total']['recovered'],
      data[i]['total']['deceased'], data[i]['total']['tested']);
    }
    return {
      recovered: this.totalRecovered,
      confirmed: this.totalConfirmed,
      deceased: this.totalDeceased
  }
  }
}
