import { Hotel } from "../models/hotel";
import { IHotel } from "hotel";

function getAll (query: any): Promise<Hotel[]>{
  return new Promise(async (resolve, reject) => {
    try {
      let where = query.where || {};
      console.log(where);
      
      const hotels = await Hotel.findAll({
        where: where
      });
  
      return resolve(hotels);
    } catch (error) {
      return reject(error);
    }
  }); 
}

function getId(id: string): Promise<Hotel> {
  return new Promise(async (resolve, reject) => {
    try {
      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        return resolve(null);
      }

      return resolve(hotel);
    } catch (error) {
      return reject(error);
    }
  }); 
}

function post(body: IHotel): Promise<Hotel> {
  return new Promise(async (resolve, reject) => {
    try {
      let data:any = body;
      data.amenities = data.amenities.join();

      const hotel = await Hotel.create(data);
      return resolve(hotel);
    } catch (error) {
      return reject(error);
    }
  }); 
}

function update(id: string, body: IHotel): Promise<Hotel> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('amenities', body);

      const hotel = await Hotel.findByPk(id);
      
      if (!hotel) {
        return resolve(null);
      }

      let data: any = body;
      data.amenities = data.amenities.join();

      await hotel.update(data);

      return resolve(hotel);
    } catch (error) {
      console.log('error', error);
      return reject(error);
    }
  }); 

}

function deleteHotel(id: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        return resolve(false);
      }

      await hotel.destroy();

      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  }); 
}

export const HotelCtrl = {
  getAll: getAll,
  getId: getId,
  post: post,
  update: update,
  delete: deleteHotel
}