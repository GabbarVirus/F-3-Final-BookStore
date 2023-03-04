let Form = document.getElementById("Form")
let Searchings = document.getElementById("search")
let Results = document.getElementById("Results")
Form.addEventListener("submit", (e) =>
{  e.preventDefault();
      let Query = Searchings.value;
  const searchHist = JSON.parse(localStorage.getItem("src-History") || "[]")
   if(Searchings.value === "")
    {
        console.log("No searches to be added");
    }
    else
    {   const searchrecord =
        {
            query: Query,
            DateTimes: new Date().toISOString()
        }
       searchHist.unshift(searchrecord)
        localStorage.setItem("src-History", JSON.stringify(searchHist))
    }
    Results.innerHTML = ``
   fetch(`https://www.googleapis.com/books/v1/volumes?q=${Query}`)
    .then((response) => response.json())
    .then((data) =>
    {
      
        let booksdata = data.items;
        
        console.log(booksdata);
        if(Searchings.value === "")
        {
            console.log("empty");
            Results.innerHTML = "<h2> Search Field is EMPTY! </h2>"
        }
        else if(data.totalItems === 0)
        {
            Results.innerHTML = "<h2> OOPS! Your search returned no results. </h2>"
        }
        else
        {
            booksdata.map((book) =>
            {
                console.log(book);
                Results.innerHTML +=
                `
                <div class="item">
                    <div class="img-cont">
                        <center><img src="${book.volumeInfo.imageLinks.thumbnail}"></center>
                    </div>
                    <div> Title: ${book.volumeInfo.title} </div>
                    <div> Author: ${book.volumeInfo.authors} </div>
                    <div> Page Count: ${book.volumeInfo.pageCount} </div>
                    <div> Publisher: ${book.volumeInfo.publisher} </div>
                    <section class="buynow"> <a href="${book.volumeInfo.infoLink}" target="_blank"> Buy Now </a> </section>
                </div> 
                `
            })
        } 
    })
})