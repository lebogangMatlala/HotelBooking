import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import userArray from '../../app/User';
import { SignupPage } from '../signup/signup';
import { ViewPage } from '../view/view';
import { ProfilePage } from '../profile/profile';
import { BookingPage } from '../booking/booking';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  userArr=userArray;


  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    

  }

 signUp()
 {
   this.navCtrl.setRoot(SignupPage);
 }

 backButt()
 {
  this.navCtrl.setRoot(ViewPage);
 }

 signIn(email,password)
 {

      // firebase.auth().signInWithEmailAndPassword(email, password)

  

  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    
    console.log('user has login');
   

    let alert = this.alertCtrl.create({
      title: 'User',
      message: 'Do you want to view your profile or make Bookings? ',
      buttons: [
        {
          text: 'View Profile',
          role: 'Profile',
          handler: () => {
            console.log('Profile page');
            this.navCtrl.setRoot(ProfilePage);
          }
        },
        {
          text: 'Book',
          handler: () => {
            console.log('Booking page');
            this.navCtrl.setRoot(BookingPage);

          }
        }
      ]
    });
    alert.present();
    

      this.navCtrl.setRoot(BookingPage);


  }).catch((error) => {
    //var errorCode = error.code;
    var errorMessage = error.message;

    let toast = this.toastCtrl.create({
      message: ''+errorMessage,
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

    console.log(errorMessage);
  });
  


 
  
   
}

}
