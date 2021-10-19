import Service from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class FetchedDataService extends Service {
  @tracked Result = [];

  addData(sNo, state, confirmed, recovered, deceased, tested){
    this.Result.pushObject({
      sNo,
      state,
      recovered,
      confirmed,
      deceased,
      tested
    })
  }
}
