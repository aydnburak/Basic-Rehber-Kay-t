const ad=document.getElementById('ad');
const soyad=document.getElementById('soyad');
const mail=document.getElementById('mail');
const form=document.getElementById('form-rehber');
const kisiListesi=document.querySelector('.kisi-listesi');


const tumKisilerDizisi=[];
let secilenSatir = undefined;

form.addEventListener('submit',kaydet);
kisiListesi.addEventListener('click',kisiIslemleriniYap);

function kisiIslemleriniYap(event){
    if(event.target.classList.contains('btn--edit')){
        document.querySelector('.kaydetGuncelle').value='Güncelle';
        const secilenTR=event.target.parentElement.parentElement;
        const guncellenecekMail=secilenTR.cells[2].textContent;
        ad.value=secilenTR.cells[0].textContent;
        soyad.value=secilenTR.cells[1].textContent;
        mail.value=secilenTR.cells[2].textContent;

        secilenSatir=secilenTR;

        
    }else if(event.target.classList.contains('btn--delete')){
        const silinecekTR=event.target.parentElement.parentElement;
        const silinecekMail=event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTR,silinecekMail);
    }
}

function rehberdenSil(silinecekTrElement,silinecekMail){
    silinecekTrElement.remove();

    tumKisilerDizisi.forEach((kisi,index)=>{
        if(kisi.mail===silinecekMail){
            tumKisilerDizisi.splice(index,1);
        }
    });

    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value='Kaydet';
}

function kaydet(e){
    e.preventDefault();

    const eklenecekKisi={
        ad:ad.value,
        soyad:soyad.value,
        mail:mail.value
    }
    const sonuc = verileriKontrolEt(eklenecekKisi);
    if(sonuc.durum){

        if(secilenSatir){
         //güncelle
         kisiyiGuncelle(eklenecekKisi);   
        }else{
            kisiyiEkle(eklenecekKisi);
            bilgiOlustur(sonuc.mesaj,sonuc.durum);
        }
        
    }else{
        bilgiOlustur(sonuc.mesaj,sonuc.durum);
    }
    
    
}

function kisiyiGuncelle(kisi){

    for(let i=0;i<tumKisilerDizisi.length;i++){
        if(tumKisilerDizisi[i].mail===secilenSatir.cells[2].textContent){
            tumKisilerDizisi[i]=kisi;
            break;
        }
    }

    secilenSatir.cells[0].textContent=kisi.ad;
    secilenSatir.cells[1].textContent=kisi.soyad;
    secilenSatir.cells[2].textContent=kisi.mail;
    document.querySelector('.kaydetGuncelle').value='Kaydet';
    secilenSatir=undefined;

}

function kisiyiEkle(eklenecekKisi){
    const olusturulanTrElemani=document.createElement('tr');
    olusturulanTrElemani.innerHTML=`
    <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        
    </td>`;
    kisiListesi.appendChild(olusturulanTrElemani);
    tumKisilerDizisi.push(eklenecekKisi);
}

function verileriKontrolEt(kisi){

    for(const deger in kisi){
        if(kisi[deger]){
        }else{
            const sonuc={
                durum:false,
                mesaj:'Boş Alan Birakmayınız'
            }
            return sonuc;
        }
    }
    alanlariTemizle();
    return {
        durum:true,
        mesaj:'Başarılı'
    }
}

function bilgiOlustur(mesaj,durum){
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent =mesaj;
    olusturulanBilgi.className='bilgi';
    if(durum){
        olusturulanBilgi.classList.add('bilgi--success');
    }else{
        olusturulanBilgi.classList.add('bilgi--error');
    }
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);

    setTimeout(() => {
        const silinecekDiv = document.querySelector('.bilgi');
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    }, 2000);
}

function alanlariTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}