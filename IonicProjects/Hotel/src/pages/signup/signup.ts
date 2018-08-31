import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import userArray from '../../app/User';
import { SigninPage } from '../signin/signin';
import { ProfilePage } from '../profile/profile';
import { BookingPage } from '../booking/booking';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  UserArr=userArray;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
        console.log('Sign-out successful');
    }).catch((error) => {
        console.log(error);
    });

    this.UserArr=[];
    this.gotData();
    console.log(this.UserArr);
  }

  signIn()
  {
    this.navCtrl.setRoot(SigninPage);

  }

  saveUser(firstName,lastName,email,password)
  {

    this.UserArr=[];

  
    
    if(firstName!='' && firstName!=null && lastName!='' && lastName!=null && email!='' && email!=null &&password!='' && password!=null)
    {

      firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
        
        var userID = firebase.auth().currentUser.uid;

      
        
          if(userID!=null)
          {
            firebase.database().ref('users/' +userID).set({
    
              firstName:firstName,
              lastName:lastName,
              email:email,
              password:password
        
            });

       
        
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
              
        
       
          }
     

        console.log(userID);
      })


      
      // firebase.auth().signOut().then(()=> {
      //   // Sign-out successful.
      //     console.log('Sign-out successful');
      // }).catch((error) => {
      //     console.log(error);
      // });

     
    }
    else{
     console.log("Please check your details some information is missing");
    }
    

 
  }

  gotData()
  {
    this.UserArr=[];

    firebase.database().ref('users').on('value', (data: any) => {

      var userDetails = data.val();
 
      console.log(userDetails);
 
      var keys: any = Object.keys(userDetails);
 
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
 
        let obj = {
          firstName: userDetails[k].firstName,
          id: k
        }
 
 
        this.UserArr.push(obj);
       
 
        console.log(this.UserArr);
 
 
      } ;
 
 
    })
    this.UserArr=[];
  }

}
