//配列
let BOOKS = [];
let savedBooks = localStorage.getItem("books");
if(savedBooks){
    BOOKS = JSON.parse(savedBooks);
}

//本の情報追加
function additionalValue() {
    let date = document.getElementById("dateInput").value;
    let title = document.getElementById("titleInput").value;
    let author = document.getElementById("authorInput").value;
    let memo = document.getElementById("memoInput").value;
    let rating = document.getElementById("ratingInput").value;

    //未入力の時はなし
    if (date === "") date = "";
    if (title === "") title = "なし";
    if (author === "") author = "なし";
    if (memo === "") memo = "なし";
    if (rating === "") rating = "なし";

    //ID自動付与
    let id = Date.now();

    //オブジェクトを作成
    let BOOK = {
        id: id,
        date: date,
        title: title,
        author: author,
        memo: memo,
        rating: rating
    }

    //配列に追加
    BOOKS.push(BOOK);
    console.log(BOOKS);

    //ローカルストレージに保存
    localStorage.setItem("books", JSON.stringify(BOOKS));
    console.log(localStorage.getItem("books"));

    //通知
    alert("本が記録されました");

    //ホーム戻る
    location.href = "index.html";
}

//リスト表示
function bookListDisplay(){
    let bookListId = document.getElementById("booklist");
    if(!bookListId) return;
    bookListId.innerHTML = "";

    for(let i = 0; i < BOOKS.length; i++){
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-item");
        
        //日付
        let dateP = document.createElement("P");
        dateP.textContent = "日付：" + BOOKS[i].date; 

        //タイトル
        let titleP = document.createElement("p");
        titleP.textContent = "タイトル：" + BOOKS[i].title;

        //作者
        let authorP = document.createElement("P");
        authorP.textContent = "作者：" + BOOKS[i].author;

        //一言メモ
        let memoP = document.createElement("P");
        memoP.textContent = "メモ：" + BOOKS[i].memo;

        //評価
        let ratingP = document.createElement("p");
        ratingP.textContent = "評価：" + "★".repeat(BOOKS[i].rating);

        bookDiv.appendChild(dateP);
        bookDiv.appendChild(titleP);
        bookDiv.appendChild(authorP);
        bookDiv.appendChild(memoP);
        bookDiv.appendChild(ratingP);

        bookListId.appendChild(bookDiv);
        console.log(BOOKS[i]);

        //削除ボタン
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.onclick = function(){
            deleteBook(BOOKS[i].id);
        }
        bookDiv.appendChild(deleteBtn);
    }

    let countP = document.getElementById("count");
    if(countP){
        countP.textContent = BOOKS.length + "件";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bookListDisplay();
    let dateInput = document.getElementById("dateInput");
    if(dateInput){
        dateInput.value = new Date().toISOString().split("T")[0];
    }
});
//削除機能
function deleteBook(id){
    if(!confirm("この本を削除しますか？")) return;
    BOOKS = BOOKS.filter(book => book.id !== id);
    localStorage.setItem("books", JSON.stringify(BOOKS));
    bookListDisplay();
}

//検索用関数
function searchBooks(){
    let keyword = document.getElementById("titlesearch").value;
    let bookListId = document.getElementById("booklist");
    bookListId.innerHTML = "";

    let filterBooks = BOOKS.filter(book =>
        book.title.includes(keyword)||
        book.author.includes(keyword)||
        book.memo.includes(keyword) ||
        book.date.includes(keyword) ||
        String(book.rating).includes(keyword)
    );
    
    for(let i = 0; i < filterBooks.length; i++){
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-item");

        let dateP = document.createElement("p");
        dateP.textContent = "日付：" + filterBooks[i].date;

        let titleP = document.createElement("p");
        titleP.textContent = "タイトル：" + filterBooks[i].title;

        let authorP = document.createElement("p");
        authorP.textContent = "作者：" + filterBooks[i].author;

        let memoP = document.createElement("p");
        memoP.textContent = "メモ：" + filterBooks[i].memo;

        let ratingP = document.createElement("p");
        ratingP.textContent = "評価：" + "★".repeat(filterBooks[i].rating);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.onclick = function(){
            deleteBook(filterBooks[i].id);
        }

        bookDiv.appendChild(dateP);
        bookDiv.appendChild(titleP);
        bookDiv.appendChild(authorP);
        bookDiv.appendChild(memoP);
        bookDiv.appendChild(ratingP);
        bookDiv.appendChild(deleteBtn);

        bookListId.appendChild(bookDiv);

        let countP = document.getElementById("count");
        if(countP){
            countP.textContent = filterBooks.length + "件";
        }

    }

}



