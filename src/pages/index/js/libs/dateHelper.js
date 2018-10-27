
export const formatDate = (time,YYYY) => {
  let t = parseInt(time)*1000;
  let d=new Date(t),
      year = d.getFullYear(),
      month = d.getMonth() + 1,
      date = d.getDate(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if(YYYY){
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  }else{
    return month + "月" + date + "日" + hour + ":" + minute;
  }
};

//获取url参数
export const  GetQueryString = (name) => {
  // console.log(name);
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  // console.log(reg);
  let r = window.location.search.substr(1).match(reg);

  if(r!=null)
    return  decodeURI(r[2]);

  return null;
}
