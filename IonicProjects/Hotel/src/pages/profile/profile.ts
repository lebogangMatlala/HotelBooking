import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ViewPage } from '../view/view';

declare var firebase ;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  arrProfile= new Array()

  name;
  surname;

 constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public loadingCtrl: LoadingController) {


   
 }


 

 ionViewDidLoad() {
   console.log('ionViewDidLoad ProfilePage');

   firebase.auth().onAuthStateChanged((user)=> {
     if (user) {
       console.log('User has sign in');
       var id =firebase.auth().currentUser.uid;
       console.log(id);

       firebase.database().ref('users/' +id).on('value', (data: any) => {

         var userDetails = data.val();
    
         console.log(userDetails);
   
         var userID =firebase.auth().currentUser.uid;
   
         console.log(userID);

         if(userDetails!=null && userDetails!='')
         {
           let obj = {
             id:userID,
             name: userDetails.firstName,
             surname: userDetails.lastName,
             email:userDetails.email
           
          
           }
          this.arrProfile.push(obj);
          console.log(this.arrProfile);
         }
         else if(userDetails===null && userDetails===''){
           console.log('User doesnt exist')
         }
    
       })
       this.arrProfile=[];


     }
     else{
       console.log('User has not sign in');

       // let alert = this.alertCtrl.create({
       //   title: 'User',
       //   message: 'Sign in to view your profile ',
       //   buttons: [
       //     {
       //       text: 'Cancel',
       //       role: 'cancel',
       //       handler: () => {
       //         console.log('Cancel clicked');
       //         this.navCtrl.setRoot(ViewPage);
       //       }
       //     },
       //     {
       //       text: 'Ok',
       //       handler: () => {
       //         console.log('Ok clicked');
       //         this.navCtrl.setRoot(SigninPage);

       //       }
       //     }
       //   ]
       // });
       // alert.present();
       
     }
   });
 }

 gotoHome()
 {
   this.navCtrl.setRoot(ViewPage);
 }

 updateAccount(id)
 {
   this.arrProfile=[];
   console.log(id);

   

   const alert = this.alertCtrl.create({
     title: 'Update User Information',
     subTitle: 'Edit your information here',
     inputs: [
       {
         name: 'firstName',
         placeholder: 'firstName'
       },
       {
         name: 'lastName',
         placeholder: 'lastName'
       },
       {
         name: 'email',
         placeholder: 'email'
       },
     ],
     buttons: [
       {
         text: 'Add',
         handler: data => {
           // this.AddItems(data.shopping_Item);
           console.log(data.firstName);
           this.arrProfile=[];
 
           
       let obj = {
     
         firstName: data.firstName,
         lastName:data.lastName,
         email: data.email
           }
           
          this.arrProfile.push(obj);

           
           firebase.database().ref('users/'+id).update(obj);
           
           console.log('Cancel clicked'+ data.firstName);
           console.log(data.firstName);

           var user = firebase.auth().currentUser;

           user.updateEmail(data.email).then(()=> {
             // Update successful.
             console.log()
           }).catch(function(error) {
             // An error happened.
             console.log(error)
           });
        
       
         }
       },
      
     ]
   });
   alert.present();

   this.navCtrl.setRoot(ProfilePage);
   
 }

 deleteAccount(a)
 {
 
  this.presentLoading();
   
 }

 delete(a)
 {
    firebase.database().ref('users/').child(a).remove();
   firebase.database().ref('booking/').child(a).remove();

 }

 presentLoading() {


   let loading = this.loadingCtrl.create({
     content: 'Please wait...',
     duration: 3000
   });
 
   loading.present();
 
   setTimeout(() => {
     firebase.auth().onAuthStateChanged((user) => {
   

       if (user) {
 
         var a = firebase.auth().currentUser.uid;
         this.delete(a);
         user.delete().then(() =>{
           // User deleted.
           this.navCtrl.setRoot(HomePage);
         
        
         }).catch(function(error) {
           // An error happened.
    
         
 
         });
       }
     });
    
   }, 3000);
 }
 

 logout()
 {
   firebase.auth().signOut().then(()=> {
     // Sign-out successful.
       this.navCtrl.setRoot(HomePage);
      
   }).catch((error) => {
       console.log(error);
   });
 }
}
