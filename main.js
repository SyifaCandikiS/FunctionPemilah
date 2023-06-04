const fs = require('fs');
const readline = require("readline");
const stream = fs.createReadStream("./data.csv");
const rl = readline.createInterface({ input: stream });
const prompt=require("prompt-sync")({sigint:true});


let data = [];
let header = [];


rl.on("line", (row) => {
  if (header.length === 0) {
    // Memproses baris judul (header)
    header = row.split(";");
  } else {
    // Memproses baris data
    const rowData = row.split(";");
    const obj = {};

    // Membuat objek dari baris data
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = rowData[i];
    }

    // Menambahkan objek ke dalam array data
    data.push(obj);
  }
});

rl.on("close", () => {
  let hasil_mentah = [];

  for (let k = 0; k < data.length; k++) {
    const { Nama, Harga } = data[k];
    const obj_data = {
      Nama: Nama.toLowerCase(), // Mengubah nama menjadi huruf kecil
      Harga: parseInt(Harga) // Mengubah harga menjadi tipe data integer
    };
    
    hasil_mentah.push(obj_data);
  }


  var input = prompt("Masukkan Uang Anda: ");
  var uang = parseInt(input);

  let hasil = [];

  for (let count = 0; count < hasil_mentah.length; count++) {
    const variabel = hasil_mentah[count];
    var hasil_desimal = uang/variabel.Harga;
    var hasil_bulat = Math.floor(hasil_desimal);

    const obj_jadi = {
      Nama: variabel.Nama,
      Harga: variabel.Harga,
      Jumlah: hasil_bulat
    };

    hasil.push(obj_jadi);
  }

  console.log(hasil);
});

