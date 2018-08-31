import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewPage } from '../view/view';

declare var firebase;
/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  arr=new Array();

  name;
  surname;
  email;
  checkin;
  checkout;
  adults;
  children;
  roomtype;

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');



   
      this.gotData();
   

  }

  gotoHome(){
    this.navCtrl.setRoot(ViewPage);
  }

  saveBooking(name,surname,email,checkin,checkout,adults,children,roomtype)
  {

    var userID = firebase.auth().currentUser.uid;

    console.log(userID);

    this.arr=[];
    
    if(name!='' && name!=null && surname!='' && surname!=null && email!='' && email!=null &&checkin!='' && checkin!=null && checkout!='' && checkout!=null && children!='' && children!=null && roomtype!='' && roomtype!=null )
    {
      firebase.database().ref('booking/' +userID).set({
  
        name:name,
        surname:surname,
        email:email,
        checkin:checkin,
        checkout:checkout,
        adults:adults,
        children:children,
        roomtype:roomtype
  
      });

      const prompt = this.alertCtrl.create({
        message: "Booking is successfully made",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              this.navCtrl.setRoot(ViewPage);
            }
          }
        ]
      });
      prompt.present();
    }
    else{
     console.log("Please check your details some information is missing");
    }
    

 
  }

  gotData()
  {
    this.arr=[];

    firebase.database().ref('booking').on('value', (data: any) => {

      var bookingDetails = data.val();
 
      console.log(bookingDetails);
 
      var keys: any = Object.keys(bookingDetails);
 
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
 
        let obj = {
          name: bookingDetails[k].name,
          key: k,
          checkin:bookingDetails[k].checkin
        }
 
 
        this.arr.push(obj);
       
 
        console.log(this.arr);
 
 
      } ;
 
 
    })
    this.arr=[];
  }

}
