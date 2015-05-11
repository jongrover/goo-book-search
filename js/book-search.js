$(function(){

  // form submission listener
  $('#book_search').submit(function(event){
    event.preventDefault();

    // collect the user search term
    var search_term = $('#search_term').val();

    // construct the api url including search term
    var search_url = 'https://www.googleapis.com/books/v1/volumes?q='+search_term;

    //make an ajax get request to google books api
    $.ajax({
      url: search_url,
      type: "GET",
      success: function (data) {
        console.log(data);
        
        $('#results').empty();

        $.each(data.items, function(i,book){

          //get the book thumbnail
          if (book.volumeInfo.imageLinks) {
            var thumb = book.volumeInfo.imageLinks.thumbnail;
          } else {
            var thumb = 'images/book-placeholder.png';
          }

          //get title
          if (book.volumeInfo.title) {
            var title = book.volumeInfo.title;
          } else {
            var title = 'Unknown';
          }

          //get the author
          if (book.volumeInfo.authors) {
            var auth = book.volumeInfo.authors[0];
          } else {
            var auth = 'Unknown';
          }

          //link to the book
          if (book.volumeInfo.previewLink) {
            var book_url = book.volumeInfo.previewLink;
          } else {
            var book_url = 'http://www.google.com/404';
          }

          var ele = '<div class="book">'+
                      '<a target="_blank" href="'+book_url+'">'+
                        '<img src="'+thumb+'" alt="'+title+'">'+
                        '<p>'+title+'<br>'+auth+'</p>'+
                      '</a>'+
                    '</div>';

          //append to div#results
          $('#results').append(ele);

        });

      },
      error: function (jqHXR, status, error) {
       console.log(jqHXR, status, error);
      }

    }); // ajax
  });  // submit
}); // doc ready

    //API NOTES:
    // https://www.googleapis.com/books/v1/volumes?q=cat

    //SAMPLE JSON:

    /*

    data = {
     "kind": "books#volumes",
     "totalItems": 1101,
     "items": [
      {
       "kind": "books#volume",
       "id": "w0DdfddCXOUC",
       "etag": "7zNbRKxL2JE",
       "selfLink": "https://www.googleapis.com/books/v1/volumes/w0DdfddCXOUC",
       "volumeInfo": {
        "title": "Save the Cat!",
        "subtitle": "The Last Book on Screenwriting You'll Ever Need",
        "authors": [
         "Blake Snyder"
        ],
        "publisher": "Michael Wiese Productions",
        "publishedDate": "2005-05-25",
        "description": "This ultimate insider's guide reveals the secrets that none dare admit, told by a show biz veteran who's proven that you can sell your script if you can save the cat!",
        "industryIdentifiers": [
         {
          "type": "ISBN_13",
          "identifier": "9781615930005"
         },
         {
          "type": "ISBN_10",
          "identifier": "1615930000"
         }
        ],
        "readingModes": {
         "text": true,
         "image": false
        },
        "pageCount": 195,
        "printType": "BOOK",
        "averageRating": 4.0,
        "ratingsCount": 1020,
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "0.0.2.0.preview.2",
        "imageLinks": {
         "smallThumbnail": "http://bks4.books.google.com/books/content?id=w0DdfddCXOUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
         "thumbnail": "http://bks4.books.google.com/books/content?id=w0DdfddCXOUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.com/books?id=w0DdfddCXOUC&printsec=frontcover&dq=cat&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=w0DdfddCXOUC&dq=cat&hl=&source=gbs_api",
        "canonicalVolumeLink": "http://books.google.com/books/about/Save_the_Cat.html?hl=&id=w0DdfddCXOUC"
       },
       "saleInfo": {
        "country": "US",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
         "amount": 19.95,
         "currencyCode": "USD"
        },
        "retailPrice": {
         "amount": 11.31,
         "currencyCode": "USD"
        },
        "buyLink": "http://books.google.com/books?id=w0DdfddCXOUC&dq=cat&hl=&buy=&source=gbs_api",
        "offers": [
         {
          "finskyOfferType": 1,
          "listPrice": {
           "amountInMicros": 1.995E7,
           "currencyCode": "USD"
          },
          "retailPrice": {
           "amountInMicros": 1.131E7,
           "currencyCode": "USD"
          }
         }
        ]
       },
       "accessInfo": {
        "country": "US",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
         "isAvailable": true,
         "acsTokenLink": "http://books.google.com/books/download/Save_the_Cat-sample-epub.acsm?id=w0DdfddCXOUC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "pdf": {
         "isAvailable": false
        },
        "webReaderLink": "http://books.google.com/books/reader?id=w0DdfddCXOUC&hl=&printsec=frontcover&output=reader&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
       },
       "searchInfo": {
        "textSnippet": "This ultimate insider&#39;s guide reveals the secrets that none dare admit, told by a show biz veteran who&#39;s proven that you can sell your script if you can save the cat!"
       }
      },

  */