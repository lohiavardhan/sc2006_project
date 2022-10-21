import requests
from bs4 import BeautifulSoup
import pandas as pd
from bs4 import BeautifulSoup


def amazon(keyword,number_of_item):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US, en;q=0.5'
    }

    search_query = keyword.replace(' ', '+')
    amazon_url = 'https://www.amazon.sg/s?k={0}'.format(search_query)
    items = []
    count = 0
    
    


    for i in range(1, 3):
        print('Processing {0}...'.format(amazon_url + '&page={0}'.format(i)))
        response = requests.get(amazon_url + '&page={0}'.format(i), headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser') 
        results = soup.find_all('div', {'class': 's-result-item', 'data-component-type': 's-search-result'})
        for result in results:
            if(count == number_of_item):
                break
            product_name = result.h2.text
            platform = "Amazon"


            try:
                price = result.find_all('span', {'class': 'a-offscreen'})
                discounted_price = price[0].text
                ori_price = price[1].text
            except:
                try:
                    discounted_price = price[0].text
                    ori_price = "none"
                except:
                    continue
            try:
                rating = result.find('span', {'class': 'a-icon-alt'}).text
                product_url = 'https://amazon.sg' + result.h2.a['href']
                image_url = result.find('img', {'class': 's-image'})
                image = image_url['src']
                shipping = result.find_all('div',{'class':'a-section a-spacing-none a-spacing-top-micro'})[1].text
                product_response = requests.get(product_url, headers=headers)
                product_soup = BeautifulSoup(product_response.content, 'html.parser')
                description = product_soup.find('div',{'id':'feature-bullets','class':'a-section a-spacing-medium a-spacing-top-small'}).text
                rating_count = product_soup.find('a',{'id':'acrCustomerReviewLink'}).text
                availability = "available"
                items.append([platform,product_name, rating, rating_count, ori_price, discounted_price,product_url,image,availability,description,shipping])
                count = count+1
                print("item ", count)
            except:
                continue



    df = pd.DataFrame(items, columns=['platform','product_name', 'rating', 'rating_count','ori_price','discounted_price', 'product_url','image_url','availability','description','shipping'])
    df.to_csv('{0}_amazon.csv'.format(search_query), index=False)

dict1 = ["apple","airpods","lenovo","Sony","Fan","clock","water bottle","vacuum cleaner","keyboard","speaker","luggage",'samsung','face mask','extension cord','pillow','bag','air fryer','cup','tote bag','wallet','fridge','TV','chair','table',
        'knife','cutting board','colander','can opener','blender','food scale','saucepans','wok','plates','spoons','hair dryer','lipsticks','serum','toner','MAC lipstick','mascara','basketball','badminton','pingpong','tennis','board games','monopoly',
        'NERF gun','shoe', 'shirt','T-shirt','short pants','jeans','skirt','slippers','baby products','vitamin C','fish oil','calcium','harry potter','the lord of the rings','textbook','Nintendo Switch','PS5','XBOX','Zelda','spiderman PS5',
        'splatoon 3','GTA5','cyberpunk 2077','red wine','haidilao','maggi','instand noodle','rice','cooking oil']


for keyword in dict1:
    number_of_items = 20
    amazon(keyword,number_of_items)