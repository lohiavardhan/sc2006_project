import requests
from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time

def shopee(keyword,number_of_item):
    items=[]
    search_query = keyword.replace(' ', '+')
    count = 0
    for i in range (0,3):

        shopee_link = "https://shopee.sg/search?keyword={0}&page={1}".format(search_query,i)
        option = webdriver.ChromeOptions()
        option.add_argument('--headless')
        service = Service('/Users/yeeksheng/Downloads/chromedriver')
        driver = webdriver.Chrome(service=service, options=option)
        print('Processing {0}...'.format(shopee_link))

        driver.set_window_size(1300,800)
        driver.get(shopee_link)
        platform = "Shopee"
        

        range1 = 500
        for i in range(1,5):
            end = range1 * i 
            command = "window.scrollTo(0,"+str(end)+")"
            driver.execute_script(command)
            time.sleep(1)
        time.sleep(5)

        content = driver.page_source
        driver.quit()
        data = BeautifulSoup(content,'html.parser')
        results = data.find_all('div',class_="col-xs-2-4 shopee-search-item-result__item")

        for result in results:
            if(count == number_of_item):
                break
            try:
                product_name = result.find('div',{'class':'ie3A+n bM+7UW Cve6sh'}).text
                url = result.find('a',{'data-sqe':'link'})
                product_url = 'https://shopee.sg' + url['href']
                image_url = result.find('img',{'width':'invalid-value'})
                image=image_url['src']
            except:
                continue

            try:
                #sometimes shopee wont show the number of sales (eg: macbook)
                item_sold = result.find('div',{'class':'r6HknA uEPGHT'}).text
            except:
                item_sold = "-"
                

            try:
                ori_price = result.find('div',{'class':'vioxXd ZZuLsr d5DWld'}).text
                discounted_price = result.find('div',{'class':'vioxXd rVLWG6'}).text
            except:
                try:
                    ori_price = "None"
                    discounted_price = result.find('div',{'class':'vioxXd rVLWG6'}).text
                except:
                    continue
            
            try:
                driver = webdriver.Chrome(service=service, options=option)

                shopee_link = product_url
                driver.set_window_size(1300,800)
                driver.get(shopee_link)

                range1 = 500
                for i in range(1,5):
                    end = range1 * i 
                    command = "window.scrollTo(0,"+str(end)+")"
                    driver.execute_script(command)
                    time.sleep(1)
                time.sleep(5)
                content = driver.page_source
                driver.quit()

                product_soup = BeautifulSoup(content,'html.parser')
                shipping = product_soup.find('div',{'class':'flex items-center _2j4htc'}).text
                rate = product_soup.find_all('div',{'class':'_3y5XOB'})
                rating = rate[0].text
                rating_count = rate[1].text
                description = product_soup.find('div',{'class':'_1MqcWX'}).text
                availability = "available"
                
                items.append([platform,product_name, rating, rating_count, ori_price, discounted_price,product_url,image,availability,description,shipping])
                count = count+1
                print("item ",count)
            except:
                continue
        if(count == number_of_item):
                break

    df = pd.DataFrame(items, columns=['platform','product_name', 'rating', 'rating_count','ori_price','discounted_price', 'product_url','image_url','availability','description','shipping'])
    df.to_csv('{0}_shopee.csv'.format(search_query), index=False)


dict1 = ["apple","airpods","lenovo","Sony","Fan","clock","water bottle","vacuum cleaner","keyboard","speaker","luggage",'samsung','face mask','extension cord','pillow','bag','air fryer','cup','tote bag','wallet','fridge','TV','chair','table',
        'knife','cutting board','colander','can opener','blender','food scale','saucepans','wok','plates','spoons','hair dryer','lipsticks','serum','toner','MAC lipstick','mascara','basketball','badminton','pingpong','tennis','board games','monopoly',
        'NERF gun','shoe', 'shirt','T-shirt','short pants','jeans','skirt','slippers','baby products','vitamin C','fish oil','calcium','harry potter','the lord of the rings','textbook','Nintendo Switch','PS5','XBOX','Zelda','spiderman PS5',
        'splatoon 3','GTA5','cyberpunk 2077','red wine','haidilao','maggi','instand noodle','rice','cooking oil']

for keyword in dict1:
    number_of_items = 20
    shopee(keyword,number_of_items)
