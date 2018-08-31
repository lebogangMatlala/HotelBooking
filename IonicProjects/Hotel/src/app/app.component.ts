import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { ViewPage } from '../pages/view/view';
import { ProfilePage } from '../pages/profile/profile';
import { BookingPage } from '../pages/booking/booking';
import userArray from './User';

declare var firebase; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages2: any;

  userArr = userArray;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public alertCtrl: AlertController,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: ViewPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Booking', component: BookingPage},
      { title: 'Logout', component: HomePage },
    ];

    this.pages2 = {
    ViewPage:ViewPage,
    ProfilePage:ProfilePage,
    BookingPage:BookingPage,
    HomePage:HomePage,
    SigninPage:SigninPage,
    } 


   
  }

  booking()
  {


    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');
        var id =firebase.auth().currentUser.uid;
        console.log(id);
        this.nav.setRoot(BookingPage);
      }
      else{
        console.log('User has not sign in');

        const prompt = this.alertCtrl.create({
          message: "You have to sign In,for you to make a booking",
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                this.nav.setRoot(this.pages2.ViewPage);
              }
            },
            {
              text: 'OK',
              handler: data => {
                this.nav.setRoot(this.pages2.SigninPage);
              }
            },
    
          ]
        });
        prompt.present();
        
      }
    });

   
   
   //this.nav.setRoot(this.pages2.BookingPage);
  }

  logout()
  {
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
        console.log('Sign-out successful');
        this.nav.setRoot(this.pages2.HomePage);
    }).catch((error) => {
        console.log(error);
    });
  }

  profile()
  {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');
        var id =firebase.auth().currentUser.uid;
        console.log(id);
        this.nav.setRoot(ProfilePage);
      }
      else{
        console.log('User has not sign in');

        let alert = this.alertCtrl.create({
          title: 'User',
          message: 'Sign in to view your profile ',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                this.nav.setRoot(ViewPage);
              }
            },
            {
              text: 'Ok',
              handler: () => {
                console.log('Ok clicked');
                this.nav.setRoot(SigninPage);

              }
            }
          ]
        });
        alert.present();
        
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
