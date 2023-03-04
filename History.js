const searchHist = JSON.parse(localStorage.getItem("src-History") || "[]")

let ItemsList = document.getElementById("history")
let sea = document.getElementById("Results")
let DeleteButton = document.getElementById("Delete-History")
const histList = searchHist.map(record =>
    `<li class="hist-item">
            <a href="" class="query-link"> ${record.query} </a>
            <div> ${new Date(record.DateTimes).toLocaleString()} </div>
        </li>
    `).join('')
ItemsList.innerHTML = histList;
let Linnks = document.querySelectorAll(".query-link")
console.log(Linnks);
Linnks.forEach((link) =>
{ link.addEventListener("click", (e) =>
    {    e.preventDefault();

        Results.innerHTML = ``
        console.log(link.textContent);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${link.textContent}`)
        .then((response) => response.json())
        .then((data) =>
        {
            let booksdata = data.items;
            console.log(booksdata);
               booksdata.map((book) =>
            {
                console.log(book);
                sea.innerHTML +=
                `
                <div class="item">
                    <div class="img-cont">
                        <img src="${book.volumeInfo.imageLinks.thumbnail}">
                    </div>
                    <div> Title: ${book.volumeInfo.title} </div>
                    <div> Author: ${book.volumeInfo.authors} </div>
                    <div> Page Count: ${book.volumeInfo.pageCount} </div>
                    <div> Publisher: ${book.volumeInfo.publisher} </div>
                    <section class="buynow"> <a href="${book.volumeInfo.infoLink}" target="_blank"> Buy Now </a> </section>
                </div> 
                `
            })
        })
    })
})
if(localStorage.getItem('src-History') === null)
{
    ItemsList.innerHTML = 'Your Search History is Empty!';
    DeleteButton.disabled = "true"
}
DeleteButton.addEventListener('click', () =>
{
   
    localStorage.removeItem('src-History');
    sea.innerHTML = '';
    ItemsList.innerHTML = 'Your Search History is Empty!';
    DeleteButton.disabled = "true"
});