const request = require("request");

function getPrice(value: number): string[] {
  const stringValue = value.toString();
  const decimalValue = stringValue.indexOf('.');

  if (decimalValue > -1) {
    return stringValue.split('.');
  } else {
    return [stringValue, '00'];
  }
}

function getAll(query: any): Promise<any> {
  return new Promise(function (resolve, reject) {
    try {
      query = query || 'query';
      const options = {
        url: 'https://api.mercadolibre.com/sites/MLA/search?q=' + query,
        headers: {
          'User-Agent': 'request'
        }
      };

      request.get(options, function (err: any, resp: any, body: string) {
        if (err) {
          reject(err);
        } else {
          const data = JSON.parse(body);

          const categories: string[] = [];
          const items: any[] = [];
          const metaCategories: any = {};

          if (data.results.length > 0) {
            data.results.forEach((element: any) => {

              if (!metaCategories[element.category_id]) {
                metaCategories[element.category_id] = 0;
              }

              metaCategories[element.category_id] = metaCategories[element.category_id] + 1;

              if (!categories.includes(element.category_id)) {
                categories.push(element.category_id);
              }

              const priceValue = getPrice(element.price);

              items.push(
                {
                  "id": element.id,
                  "title": element.title,
                  "price": {
                    "currency": element.currency_id,
                    "amount": +priceValue[0],
                    "decimals": +priceValue[1],
                  },
                  "picture": element.thumbnail,
                  "condition": element.condition,
                  "free_shipping": element.shipping.free_shipping
                },
              )
            });
          }

          // check main category
          let mainCatg = [null, 0];
          for (const key in metaCategories) {
            if (metaCategories.hasOwnProperty(key)) {
              if (metaCategories[key] > mainCatg[1]) {
                mainCatg = [key, metaCategories[key]];
              }
            }
          }

          const response = {
            author: {
              name: 'Dayana',
              lastname: 'Serrano'
            },
            categories: categories,
            items: items.slice(0, 4),
            breadcrumb: mainCatg
          };

          resolve(response);
        }
      });
    }
    catch (error) {
      return reject(error);
    }
  })
}

function getId(id: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        url: 'https://api.mercadolibre.com/items/' + id,
        headers: {
          'User-Agent': 'request'
        }
      };

      request.get(options, function (err: any, resp: any, body: string) {
        if (err) {
          reject(err);
        } else {
          const data = JSON.parse(body);
          
          if (resp.statusCode !== 200) {
            return resolve(null);
          }
          
          const priceValue = getPrice(data.price);

          const response = {
            author: {
              name: 'Dayana',
              lastname: 'Serrano'
            },
            item: {
              id: data.id,
              title: data.title,
              price: {
                currency: data.currency_id,
                amount: +priceValue[0],
                decimals: +priceValue[1],
              },
              picture: data.thumbnail,
              condition: data.condition,
              free_shipping: data.shipping.free_shipping,
              sold_quantity: data.sold_quantity,
              description: '',
              category_id: data.category_id
            }
          };

          options.url = 'https://api.mercadolibre.com/items/' + id + '/descriptions';

          request.get(options, function (err: any, resp: any, body: string) {
            if (err) {
              reject(err);
            } else {
              const dataDescription = JSON.parse(body);
              response.item.description = dataDescription[0].plain_text;
              resolve(response);
            }
          });
        }
      })
    } catch (error) {
      return reject(error);
    }
  });
}

function getIdDescription(id: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        url: 'https://api.mercadolibre.com/items/' + id + '/descriptions',
        headers: {
          'User-Agent': 'request'
        }
      };

      request.get(options, function (err: any, resp: any, body: string) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      })
    } catch (error) {
      return reject(error);
    }
  });
}

export const ItemCtrl = {
  getAll: getAll,
  getId: getId
}
