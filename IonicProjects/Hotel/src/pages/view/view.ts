import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rooms } from '../../app/Rooms';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  roomArray= new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.roomArray =[new Rooms("double room","R1200.00","../../assets/icon/beds/double.jpg","Ideal for one to two people, double rooms at LaBooh Hotel overlook either the courtyard or street. All rooms have double glazing, ensuring a calm and relaxing environment for our guests. Double rooms have a double bed (140cm), an en-suite bathroom with bath, and separate toilet."),
    new Rooms("Twin room","R1400.00","../../assets/icon/beds/double-single.jpg","LaBooh Hotel twin rooms can accommodate up to two people in adjacent twin beds (90cm wide). Our twin rooms overlook the courtyard, ensuring the utmost peace and quiet for our guests. All twin rooms have an en-suite bathroom with bath and toilet"),
    new Rooms("Triple room","R1650,00","../../assets/icon/beds/triple.jpg","LaBooh Hotel  triple rooms can accommodate up to three people. They offer a double bed (140cm) and a single bed (90cm). Our triple rooms overlook the street and have double glazing to ensure peace and quiet for our guests. All of our triple rooms have an en-suite bathroom with bath and toilet"),
    new Rooms("Triplets room","R1850,00","../../assets/icon/beds/triple2.jpg","LaBooh Hotel  triple rooms can accommodate up to three people. They offer Three single bed (90cm). Our triple rooms overlook the street and have double glazing to ensure peace and quiet for our guests. All of our triple rooms have an en-suite bathroom with bath and toilet"),
    new Rooms("Quad room","R2100,00","../../assets/icon/beds/quad.jpg","The LaBooh Hotel Quad Room offers space for four people and is ideal for families. The room features a  two double bed and sofa bed suitable for 2 persons, dressed in pure cotton sheets and fluffy pillows to ensure a good night’s sleep. The room is equipped with a 42” flat screen Smart TV and a modern bathroom including a shower with bath, and luxurious fair trade bathroom amenities.The complimentary high speed wifi keeps you easily connected to your work, family, and friends."),
    new Rooms("Quadrants room","R2500,00","../../assets/icon/beds/quad_room.jpg","The LaBooh Hotel Quad Room offers space for four people and is ideal for families. The room features a  four twin bed and sofa bed suitable for 2 persons, dressed in pure cotton sheets and fluffy pillows to ensure a good night’s sleep. The room is equipped with a 42” flat screen Smart TV and a modern bathroom including a shower with bath, and luxurious fair trade bathroom amenities.The complimentary high speed wifi keeps you easily connected to your work, family, and friends.Complimentary access to the spa & wellness center and fitness area in Plaza offers you a relaxing retreat after a busy day."),
    new Rooms("King room","R2650,00","../../assets/icon/beds/studio 2.jpg","A room with a king-sized bed. May be occupied by one or more people.The room size or area of King Rooms are generally between 32 m² to 50 m².All rooms have double glazing, ensuring a calm and relaxing environment for our guests. king room has  an en-suite bathroom with bath, and separate toilet"),
    new Rooms("Studio room","R3550,00","../../assets/icon/beds/studio.jpg","Studio suite is a cosy 33 sq m of tastefully furnished space offering a comfortable stay. Each suite is aesthetically designed, well ventilated and has a fully equipped kitchenette, air-conditioned bedroom, bathroom, a Living area, open kitchenette, a counter type dining and balcony. Best suited for business travelers and tourists"),
    new Rooms("Junior Suite room","R4500,00","../../assets/icon/beds/suite.jpg","Junior suites, exclusively located in the main building, are an excellent way of adding some style to your stay and the only option if you wish to have interconnected rooms (interconnect with the Superior Deluxe twin rooms, on request). Each of these magnificent 45 m2 (484 ft2) suites are tastefully decorated and distinguished by supreme comfort, maximum functionality, a wealth of complimentary amenities and fantastic views" ),
    
  ];


      console.log(this.roomArray);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    
  
  }

  click(b)
  {
    console.log(b);
    this.navCtrl.setRoot(DetailsPage,{objarr:this.roomArray,index :b});
  }

}
