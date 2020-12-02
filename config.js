'use strict';

exports.success = (values, res) => {
  const data = {
    'status': 200,
    'values': values
  };
  res.json(data);
  res.end();
}


// response untuk nested matakuliah
exports.jsonData = (values, res) => {
  // lakukan akumulasi
  const result = values.reduce((acc, curr) => {
    console.log(values)
    // tentukan key group
    if(acc[curr.nama]){
      // buat variable group nama / key
      const result = acc[curr.nama];
      // cek jika matkul === array
      if(Array.isArray(result.matkul)){
        // tambahkan value kedalam array matkul
        result.matkul.push(curr.matkul);
      }else{
        result.matkul = [result.matkul, curr.matkul];
      }
    }else{
      acc[curr.nama] = curr;
    }
    return acc;
  }, {});

  const data = {
    'status': 200,
    'values': result
  };
  res.json(data);
  res.end();
}