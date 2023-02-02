import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-confirm-flights-page',
  templateUrl: './confirm-flights-page.component.html',
  styleUrls: ['./confirm-flights-page.component.css'],
})
export class ConfirmFlightsPageComponent {
  selectedFlights = this.flightService.getSelectedFlights();
  totalPrice = this.flightService.getTotalPriceOfSelectedFlights();

  isCompleted=true;
  isLinear = true;

  constructor(private route: Router, private flightService: ApiClientService) {}
  
  ngOnInit() {
    this.invokeStripe();
  }

  paymentHandler: any = null;
  published_key = 'pk_test_51MWLP4CtRfbKEF0FQNdWE4BiKjKOekTvMmkR4WBsBQdOFpKftVrcXRsTArFdXHuH4c6M2qcYx1CY4Ur3Cs4PzUYQ00ntT6NrTJ'
 
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.published_key,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'FlyAway',
      description: 'Book your flight!',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.published_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}



  //  confirmedFlight = [
  //     {
  //       segments: [
  //           {
  //               departure: {
  //                   iataCode: "DAC",
  //                   at: "2023-03-04T13:00:00"
  //               },
  //               arrival: {
  //                   iataCode: "KWI",
  //                   at: "2023-03-04T15:55:00"
  //             }
  //           },
  //           {
  //               departure: {
  //                   iataCode: "KEI",
  //                   at: "2023-03-04T18:15:00"
  //               },
  //               arrival: {
  //                   iataCode: "RUH",
  //                   at: "2023-03-04T21:30:00"
  //               }
  //           }
  //       ],
  //       price: 136.67
  //     }    
  // ,
    
  //         {
  //           segments: [
  //               {
  //                   departure: {
  //                       iataCode: "RUH",
  //                       at: "2023-03-04T13:00:00"
  //                   },
  //                   arrival: {
  //                       iataCode: "KEI",
  //                       at: "2023-03-04T15:55:00"
  //                   }
  //               },
  //               {
  //                   departure: {
  //                       iataCode: "KEI",
  //                       at: "2023-03-04T18:15:00"
  //                   },
  //                   arrival: {
  //                       iataCode: "USA",
  //                       at: "2023-03-04T21:30:00"
  //                   }
  //               }
  //           ],
  //           price: 136.67
  //         } 
  //   ];

  // confirmFlights = [
  //   {
  //     from: {
  //       time: "5.00PM",
  //       iataCode: "DEL",
  //       airportName:"Indira Gandhi International Airport",
  //     },
  //     to: {
  //       time: "7.30PM",
  //       iataCode: "CCU",
  //       airportName:"Subhash Chandra Bose International Airport",
  //     },
  //     travelDate: "01/31/2023",
  //     duration: "09:30",
  //     price: "$230"
  //   },

  //   {
  //     from: {
  //       time: "4.00PM",
  //       iataCode: "DEL",
  //       airportName:"Indira Gandhi International Airport",
  //     },
  //     to: {
  //       time: "6.30PM",
  //       iataCode: "CCU",
  //       airportName:"Subhash Chandra Bose International Airport",
  //     },
  //     travelDate: "MM/DD/YYYY",
  //     duration: "09:30",
  //     price: "$230"
  //   },
  //   {
  //     from: {
  //       time: "3.00PM",
  //       iataCode: "DEL",
  //       airportName:"Indira Gandhi International Airport",
  //     },
  //     to: {
  //       time: "5.30PM",
  //       iataCode: "CCU",
  //       airportName:"Subhash Chandra Bose International Airport",
  //     },
  //     travelDate: "MM/DD/YYYY",
  //     duration: "09:30",
  //     price: "$230"
  //   }
  // ];


