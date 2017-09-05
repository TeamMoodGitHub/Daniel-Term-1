// Add some jquery
var $ = require('jquery');
// And some instafeed
var Instafeed = require("instafeed.js");

// Require the client
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'e296f73260094de3bfc3f26bb4661b7b'
});

// Search index
// app.inputs.create([
//   {url: "https://samples.clarifai.com/metro-north.jpg"},
//   {url: "https://samples.clarifai.com/wedding.jpg"},
//   {url: "http://www.lifewithcats.tv/wp-content/uploads/2014/12/23BBF15800000578-0-image-m-45_1417705550165.jpg"},
//   {url: "http://i.dailymail.co.uk/i/pix/2014/12/12/2400148900000578-2871954-Internet_sensation_The_green_moggy_has_become_hugely_popular_wit-a-41_1418413395813.jpg"},
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/20066142_1942681809288468_8955003479265378304_n.jpg"},
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20067100_333294650443616_2545535457442136064_n.jpg"},
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/19986049_148052079080099_7688816145100439552_n.jpg"},
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20969169_498651757134290_2118846266359152640_n.jpg"}, // Me
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20582921_1395240523885218_1750825731539075072_n.jpg"}, // Me
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/19227439_1435048536541009_2511635585517486080_n.jpg"}, // Brandon Woelfel
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/18812512_134586703768466_5208834490029309952_n.jpg"}, // Brandon Woelfel
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/17932601_1478710622170453_3657960067602317312_n.jpg"}, // Brandon Woelfel
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20902559_273451683157192_6288854903381032960_n.jpg"}, // Jessica Kobeisi
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20969067_137138336890820_1417712951439130624_n.jpg"}, // Jessica Kobeisi
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20686902_497579363918382_1018577934065074176_n.jpg"}, // Jessica Kobeisi
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/15099465_343331942713959_1222156171259936768_n.jpg"}, // Jessica Kobeisi
//   {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/14583450_831891420284630_7484833463720214528_n.jpg"}, // Jessica Kobeisi
//   {base64: "G7p3m95uAl..."}
// ]).then(
//   function(response) {
//     // do something with response
//   },
//   function(err) {
//     // there was an error
//   }
// );

// Search by concept
let conceptName = 'urbanxkoi';

app.inputs.search({ concept: {name: conceptName} }).then(
  function(response) {

    $('<div class="concept-name">'+conceptName+'</div>').appendTo($('.images')); // Add Concept Name

    for ( i = 0; i < response.hits.length; i++ ) {
      var imageUrl = response.hits[i].input.data.image.url;
      var matchScore = Number((response.hits[i].score * 100).toFixed(2));
      // console.log(imageUrl);
      // console.log(matchScore);

      $('<div class="image-block"><img src="'+imageUrl+'"/><span>'+matchScore+'</span></div>').appendTo($('.images')); // Add image divs to body
    }

  },

  function(err) {
    console.log("Error");
  }

);

// Train
// Concepts
function trainConcept( url, concept ) {
  app.inputs.create({
    url: url,
    concepts: [
      {
        id: concept,
        value: true
      }
    ]
  }).then(
    function(response) {
    },
    function(err) {
    }
  )
};

// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20214539_512976105704970_2530443191472095232_n.jpg", "urbanxkoi");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p750x750/19986064_133432720576936_275714815681363968_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p750x750/20181300_679473602246803_3639577530266025984_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20225876_121769051779069_3498460036089249792_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p750x750/20482423_807087076133221_3734105091821535232_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20582561_117116832271721_1733238630735937536_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p750x750/20633789_262851324217587_6217973288568619008_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20837349_1978951309056364_7850477528710905856_n.jpg", "kolder");
// trainConcept( "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20986615_1859439574372842_6859367091619758080_n.jpg", "kolder");

// app.inputs.create({
//   url: "https://4.bp.blogspot.com/-r0aRq_Av15E/V2ZsW0U3g4I/AAAAAAAAJN0/eTyXgYIngB4xdAgLzLnShl8qSwmNV1iQwCLcB/s1600/13392900_1779763455595848_2145655590_n.jpg",
//   concepts: [
//     {
//       id: "kolder",
//       value: true
//     }
//   ]
// }).then(
//   function(response) {
//     // do something with response
//   },
//   function(err) {
//     // there was an error
//   }
// );

// Add concepts
app.models.initModel("instagrammers").then(function(model) {
  updateModel(model),
  function(err) {
    // there was an error
  }
});

function updateModel(model) {
  model.mergeConcepts({"id": "urbanxkoi"}).then(
    function(response) {
      console.log(":)");
    },
    function(err) {
      console.log(":(");
    }
  );
}

// // Train model
// app.models.train("instagrammers").then(
//   function(response) {
//     // do something with response
//   },
//   function(err) {
//     // there was an error
//   }
// );

// // Predict model
// app.models.predict("instagrammers", ["https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20214539_512976105704970_2530443191472095232_n.jpg"]).then(
//   function(response) {
//     var concepts = response.outputs[0].data.concepts;

//     for ( i = 0; i < concepts.length; i++ ) {
//       console.log(concepts[i].name);
//       console.log(concepts[i].value * 100);
//     }
//   },
//   function(err) {
//     // there was an error
//   }
// );

// Instafeed stuff
var feed = new Instafeed({
  get: 'tagged',
  tagName: 'brandonwoelfel',
  clientId: 'a772fcf4f09941c2b5345cf977403edb'
});

feed.run();