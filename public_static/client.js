/**
 * Created by kasturigs on 21/04/17.
 */

$(function() {
 atc=function(e){

        $.post('/additems', {a: e.parentNode.childNodes[1].textContent ,b:e.parentNode.childNodes[3].childNodes[2].textContent }, function (itemlist) {

            console.log(itemlist);


        })
    }

    $.post('/addtocart', function(itemlist) {

        mytable=document.getElementById("mytable");

        book=[];
        quantity=[];
        price=[];
        book.push(itemlist[0].a);
        quantity.push(1);
        price.push(parseInt(itemlist[0].b.split('₹')[1]));
        for(i=1;i<itemlist.length;i++)
        {
            flag=0;
            for(j=0;j<book.length;j++)
            {
                if(book[j]==itemlist[i].a)
                {quantity[j]++;
                    price[j]+=price[j];
                    flag=1;}
            }
            if(flag==0)
            {
                book.push(itemlist[i].a);
                quantity.push(1);
                price.push(parseInt(itemlist[i].b.split('₹')[1]));
            }
        }
        str="";
        totalprice=0;
        
        for(x=0;x<book.length;x++)
        {

            str+="<tr height='100px'> <td style='font-size: x-large'>"+book[x]+"</td>"+"<td style='font-size: x-large'>"+quantity[x]+"</td>"+"<td style='font-size: x-large'>"+"<span>"+price[x]+"</span>"+"<button type='button' class='btn ' onclick='rem(this)'> Remove</button></td> </tr>"
            totalprice+=price[x];
        }
        mytable.innerHTML=str;

        last=document.getElementById("tp");
        last.innerHTML="Total Price ="+totalprice;
    })

    rem=function(e) {
     console.log(e.parentNode.previousSibling.innerHTML);
     console.log(e.parentNode.childNodes[0].innerHTML);
     price=e.parentNode.childNodes[0].innerHTML;
        console.log(price);

     quantity=e.parentNode.previousSibling.innerHTML;
     console.log(quantity);
     console.log(price/quantity);
     price=(price/quantity)*(quantity-1);

     e.parentNode.previousSibling.innerHTML--;


        e.parentNode.childNodes[0].innerHTML=price;

     // $.post('/removefromcart',{a: e.parentNode.childNodes[1].textContent ,b:e.parentNode.childNodes[3].childNodes[2].textContent },function (itemlist) {
     //
     //
     //
     //     console.log(itemlist);
     // })
    }
});