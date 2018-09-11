import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  a;
  arryRoom;
  roomName;
  roomPrice;
  roomImage;
  description;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('ionViewDidLoad DetailsPage');
    this.a=this.navParams.get("index");
    this.arryRoom=this.navParams.get("objarr");
    console.log(this.arryRoom);
    console.log(this.a);

    this.roomName=this.arryRoom[this.a].roomName;
    this.roomPrice=this.arryRoom[this.a].roomPrice;
    this.roomImage=this.arryRoom[this.a].roomimage;
    this.description=this.arryRoom[this.a].description;
    console.log(this.roomName);

    console.log(this.roomPrice);
    console.log(this.roomImage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  
  }

}
