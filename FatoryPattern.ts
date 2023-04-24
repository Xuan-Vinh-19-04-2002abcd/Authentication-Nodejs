// import {randomInt} from "crypto";

interface Giong  {
     showTenGiong():string
}
interface GiongcayTrongFactory {
    chongGiong():Giong
}
class Coffe implements Giong {
    showTenGiong(): string {
        return "cafe"
    }
}
class Caosu implements Giong {
    showTenGiong(): string {
        return "Caosu"
    }
}
class TayNguyenFactory implements GiongcayTrongFactory {
    chongGiong(): Giong {
        const random:number = 1;
        switch (random){
            case 1:
                return  new Caosu();
        }
    }
}
 const taynguyen:GiongcayTrongFactory = new TayNguyenFactory();
 const a:Giong = taynguyen.chongGiong();
console.log(a)