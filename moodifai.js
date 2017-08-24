// Add some jquery
var $ = require('jquery');

// Require the client
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'e296f73260094de3bfc3f26bb4661b7b'
});

// predict the contents of an image by passing in a url
// app.models.predict(Clarifai.GENERAL_MODEL, 'http://www.lifewithcats.tv/wp-content/uploads/2014/12/23BBF15800000578-0-image-m-45_1417705550165.jpg').then(
//   function(response) {
//     var concepts = response.outputs[0].data.concepts;

//     for ( i = 0; i < concepts.length; i++ ) {
//       console.log(concepts[i].name);
//       console.log(concepts[i].value);
//     }
//   },

//   function(err) {
//     console.error(err);
//   }

// );

// Search index
app.inputs.create([
  {url: "https://samples.clarifai.com/metro-north.jpg"},
  {url: "https://samples.clarifai.com/wedding.jpg"},
  {url: "http://www.lifewithcats.tv/wp-content/uploads/2014/12/23BBF15800000578-0-image-m-45_1417705550165.jpg"},
  {url: "http://i.dailymail.co.uk/i/pix/2014/12/12/2400148900000578-2871954-Internet_sensation_The_green_moggy_has_become_hugely_popular_wit-a-41_1418413395813.jpg"},
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/20066142_1942681809288468_8955003479265378304_n.jpg"},
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20067100_333294650443616_2545535457442136064_n.jpg"},
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/19986049_148052079080099_7688816145100439552_n.jpg"},
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20969169_498651757134290_2118846266359152640_n.jpg"}, // Me
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20582921_1395240523885218_1750825731539075072_n.jpg"}, // Me
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/19227439_1435048536541009_2511635585517486080_n.jpg"}, // Brandon Woelfel
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/18812512_134586703768466_5208834490029309952_n.jpg"}, // Brandon Woelfel
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/17932601_1478710622170453_3657960067602317312_n.jpg"}, // Brandon Woelfel
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20902559_273451683157192_6288854903381032960_n.jpg"}, // Jessica Kobeisi
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20969067_137138336890820_1417712951439130624_n.jpg"}, // Jessica Kobeisi
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20686902_497579363918382_1018577934065074176_n.jpg"}, // Jessica Kobeisi
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/15099465_343331942713959_1222156171259936768_n.jpg"}, // Jessica Kobeisi
  {url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/14583450_831891420284630_7484833463720214528_n.jpg"}, // Jessica Kobeisi
  {base64: "G7p3m95uAl..."}
]).then(
  function(response) {
    // do something with response
  },
  function(err) {
    // there was an error
  }
);

// Search by concept
let conceptName = 'woelfel';

app.inputs.search({ concept: {name: conceptName} }).then(
  function(response) {

    $('<div class="concept-name">'+conceptName+'</div>').appendTo($('.images')); // Add Concept Name

    for ( i = 0; i < response.hits.length; i++ ) {
      var imageUrl = response.hits[i].input.data.image.url;
      var matchScore = response.hits[i].score;
      console.log(imageUrl);
      console.log(matchScore);

      $('<div class="image-block"><img src="'+imageUrl+'"/><span>'+matchScore+'</span></div>').appendTo($('.images')); // Add image divs to body
    }

  },

  function(err) {
    console.log("Error");
  }

);

// Train
// Concepts
app.inputs.create({
  url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20968735_119741075347796_6917409902428160_n.jpg",
  concepts: [
    {
      id: "woelfel",
      value: true
    }
  ]
});

app.inputs.create({
  url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20838525_850992181736334_8544832367330590720_n.jpg",
  concepts: [
    {
      id: "woelfel",
      value: true
    }
  ]
});

app.inputs.create({
  url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20634982_162686580957901_2700056797225418752_n.jpg",
  concepts: [
    {
      id: "woelfel",
      value: true
    }
  ]
});

app.inputs.create({
  url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20688180_512479562418851_8009509614947139584_n.jpg",
  concepts: [
    {
      id: "woelfel",
      value: true
    }
  ]
});

app.inputs.create({
  url: "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/20482226_334230393690542_2514983272006549504_n.jpg",
  concepts: [
    {
      id: "woelfel",
      value: true
    }
  ]
});

// Create model
app.models.create(
  "woelfel-model",
  [
    { "id": "woelfel" }
  ]
).then(
  function(response) {
    // do something with response
  },
  function(err) {
    // there was an error
  }
);

// Train model
app.models.train("woelfel-model").then(
  function(response) {
    // do something with response
  },
  function(err) {
    // there was an error
  }
);

// Predict model
app.models.predict("woelfel-model", ["https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/19932854_451879225184716_1913831899474690048_n.jpg"]).then(
  function(response) {
    var concepts = response.outputs[0].data.concepts;

    for ( i = 0; i < concepts.length; i++ ) {
      console.log(concepts[i].name);
      console.log(concepts[i].value);
    }
  },
  function(err) {
    // there was an error
  }
);