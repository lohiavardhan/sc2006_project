from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import pandas as pd
import time


def lazada(keyword,number_of_item):
    items = []
    count =0

    for j in range (0,3):
        if(count == number_of_item):
            break
        search_query = keyword.replace(' ', '+')
        lazada_link = "https://www.lazada.sg/catalog/?q={0}&_keyori=ss&from=input&page={1}&spm=a2o42".format(search_query,j)
        option = webdriver.ChromeOptions()
        option.add_argument('--headless')
        service = Service('/Users/yeeksheng/Downloads/chromedriver')
        driver = webdriver.Chrome(service=service, options=option)
        print('Processing {0}...'.format(lazada_link))

        # driver.set_window_size(1300,800)
        driver.get(lazada_link)
        platform = "Lazada"


        range1 = 500
        for i in range(1,7):
            end = range1 * i 
            command = "window.scrollTo(0,"+str(end)+")"
            driver.execute_script(command)
            time.sleep(1)
        time.sleep(3)

        content = driver.page_source
        driver.quit()
        data = BeautifulSoup(content,'html.parser')
        results = data.find_all('div',class_="Bm3ON")


        for result in results:
            try:

                product_name = result.find('div',{'class':'RfADt'}).text
                url = result.find('a',{'age':'0'})['href']
                product_url = "https:"+url
                image_url = result.find('img',{'age':'0'})
                image = image_url['src']
                if (image.find('data:image')!=-1):
                    continue
                
            except:
                continue
                
            try:
                ori_price = result.find('del',{'class':'ooOxS'}).text
                discounted_price = result.find('span',{'class':'ooOxS'}).text
            
            except:
                ori_price = "None"
                discounted_price = result.find('span',{'class':'ooOxS'}).text
            
            
            try:
                driver = webdriver.Chrome(service=service, options=option)
                lazada_link = product_url
                driver.set_window_size(1300,800)
                driver.get(lazada_link)

                range1 = 500
                for i in range(1,3):
                    end = range1 * i 
                    command = "window.scrollTo(0,"+str(end)+")"
                    driver.execute_script(command)
                    time.sleep(1)
                time.sleep(3)
                content = driver.page_source
                driver.quit()
                product_soup = BeautifulSoup(content,'html.parser')
                shipping = product_soup.find('div',{'class':'delivery__content'}).text
                rating = product_soup.find('span',{'class':'score-average'}).text
                rating_count = product_soup.find('div',{'class':'count'}).text
                availability = "available"
                
                
            except:
                continue

            try:
                description = product_soup.find('div',{'class':'html-content pdp-product-highlights'}).text
            except:
                description = "-"
            count= count+1
            print(count)
            items.append([platform,product_name, rating, rating_count, ori_price, discounted_price,product_url,image,availability,description,shipping])
            if(count == number_of_item):
                break

    df = pd.DataFrame(items, columns=['platform','product_name', 'rating', 'rating_count','ori_price','discounted_price', 'product_url','image_url','availability','description','shipping'])
    df.to_csv('{0}_lazada.csv'.format(search_query), index=False)


dict1 = ["apple","airpods","lenovo","Sony","Fan","clock","water bottle","vacuum cleaner","keyboard","speaker","luggage",'samsung','face mask','extension cord','pillow','bag','air fryer','cup','tote bag','wallet','fridge','TV','chair','table',
        'knife','cutting board','colander','can opener','blender','food scale','saucepans','wok','plates','spoons','hair dryer','lipsticks','serum','toner','MAC lipstick','mascara','basketball','badminton','pingpong','tennis','board games','monopoly',
        'NERF gun','shoe', 'shirt','T-shirt','short pants','jeans','skirt','slippers','baby products','vitamin C','fish oil','calcium','harry potter','the lord of the rings','textbook','Nintendo Switch','PS5','XBOX','Zelda','spiderman PS5',
        'splatoon 3','GTA5','cyberpunk 2077','red wine','haidilao','maggi','instand noodle','rice','cooking oil']


for keyword in dict1:
    number_of_items = 20
    lazada(keyword,number_of_items)