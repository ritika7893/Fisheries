import {initialListings,initialDeliveries} from '../data/seed';
const read=(key,fallback)=>{try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}};
export const getListings=()=>{const rows=read('aqua_listings',initialListings);let changed=false;const migrated=rows.map(x=>{if(x.status==='Payment pending'&&!x.finalConfirmedAt){changed=true;return {...x,status:'Farmer accepted',acceptedPrice:Number(x.acceptedPrice||x.agreedPrice||x.offer||x.ask)};}return x;});if(changed)localStorage.setItem('aqua_listings',JSON.stringify(migrated));return migrated;};
export const saveListings=x=>localStorage.setItem('aqua_listings',JSON.stringify(x));
export const getDeliveries=()=>read('aqua_deliveries',initialDeliveries);
export const saveDeliveries=x=>localStorage.setItem('aqua_deliveries',JSON.stringify(x));
export const getUsers=()=>read('aqua_users',[{id:1,name:'Rajesh Kumar',role:'farmer',email:'rajesh@demo.com',location:'Haridwar'},{id:2,name:'Maa Ganga Hatchery',role:'hatchery',email:'hatchery@demo.com',location:'Rishikesh'},{id:3,name:'Amit Singh',role:'dam',email:'amit@demo.com',location:'Tehri'},{id:4,name:'Vikram Rawat',role:'delivery',email:'delivery@demo.com',location:'Dehradun'}]);
export const getPayments=()=>read('aqua_payments',[]);
export const savePayments=x=>localStorage.setItem('aqua_payments',JSON.stringify(x));
