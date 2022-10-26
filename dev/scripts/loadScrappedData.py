import csv
import sys
sys.path.append("..")
from core.models.Item import Item

def run():
    with open('core/items_data/Lazada/Zelda_lazada.csv', 'r', encoding="utf8") as file:
        reader = csv.reader(file)
        next(reader)

        meta_data_list = []
        for i in reader:
            # item_name = 
            # item_description = 
            # purchasable =
            # platform =
            # image_url = 
            # item_url = 
            # deliveryFee = 
            # rating = 
            # num_of_ratings = 
            # price = 
            # discounted_price = 
            count = 0
            item_data = []
            for j in i:
                j = remove_non_ascii(j)
                if count != 4 and count != 5 and count != 10 and count != 8 and count != 2 and count != 3:
                    item_data.append(clean_item_description(j))
                elif count == 4 or count == 5:
                    item_data.append(clean_price(j))
                elif count == 8:
                    item_data.append(clean_availability(j))
                elif count == 2:
                    item_data.append(clean_rating(j))
                elif count == 3:
                    item_data.append(clean_num_of_ratings(j))
                else:
                    item_data.append(clean_delivery_fee(j))
                count += 1

            meta_data_list.append(item_data)

    item_mega_list = []
    for i in meta_data_list:
        item = Item(item_name=i[1],
                    item_description=i[9],
                    purchasable=i[8],
                    platform=i[0],
                    image_url=i[7],
                    item_url=i[6],
                    deliveryFee=i[10],
                    rating=i[2],
                    num_of_ratings=i[3],
                    price=i[4],
                    discounted_price=i[5])
        item_mega_list.append(item)
    
    # for i in item_mega_list:
    #     print(i.num_of_ratings)

    for i in item_mega_list:
        i.save()
    

def remove_non_ascii(string):
    return ''.join(char for char in string if ord(char) < 128)

def clean_availability(string):
    if string.title() == 'Available':
        return True
    else:
        return False

def clean_price(string):
    if 'S$' in string:
        if '-' not in string:
            Nstring = ''.join(char for char in string[2:] if (char != ' ' and char != ','))
            return float(Nstring)
        else:
            Nstring = ''.join(char for char in string[2: string.index('-')] if (char != ' ' and char != ','))
            return float(Nstring)

    elif '$' in string:
        if '-' not in string:
            Nstring = ''.join(char for char in string[1:] if (char != ' ' and char != ','))
            return float(Nstring)
        else:
            Nstring = ''.join(char for char in string[1: string.index('-')] if (char != ' ' and char != ','))
            return float(Nstring)

    elif string.title() == 'None':
        return -1.00
    
    else:
        if '-' not in string:
            Nstring = ''.join(char for char in string if (char != ' ' and char != ','))
            return float(Nstring)
        else:
            Nstring = ''.join(char for char in string[: string.index('-')] if (char != ' ' and char != ','))
            return float(Nstring)


def clean_delivery_fee(string):
    try:
        string = clean_price(string)
        return string
    except:
        keywords = ['FREE', 'EXPRESS']
        Nstring = ''.join([i.capitalize() for i in string])
        for i in keywords:
            if i in Nstring:
                Nstring = 0.0
                return Nstring

        newString = []
        try:
            for i in string[string.index('$') + 1:]:
                if ord(i) not in range(48, 58) and ord(i) != 46:
                    break
                newString.append(i)
            
            string = "".join(i for i in newString)
            return float(string)
        except:
            return 0.0

def clean_item_description(string):
    if ' About this item    ' in string:
        return string.replace(' About this item    ', '')
    else:
        return string

def clean_num_of_ratings(string):
    if "," in string:
        string = string.replace(',', '')

    if "ratings" in string:
        return int(string.replace('ratings', ''))
    elif "Ratings" in string:
        return int(string.replace('Ratings', ''))
    elif "Rating" in string:
        return int(string.replace('Rating', ''))
    elif "rating" in string:
        return int(string.replace('rating', ''))

    if "k" in string:
        string = float(string.replace('k', ''))
        return int(string * 1000)
    
    return int(string)

def clean_rating(string):
    if "out of 5 stars" in string:
        return float(string.replace("out of 5 stars", ''))
    
    else:
        return float(string)