# FindR API Endpoints Documentation
FindR APIs are built using using the [Django REST framework](https://www.django-rest-framework.org). 

## Login API
`api/login`

Use this API to allow user login. <br>

##### Request Parameters
| Parameters    	| Type   	| Example      	| Description                               |
|---------------	|--------	|--------------	|-------------------------------------------|
| username      	| string 	| Neo-Zenith   	| Username chosen by the user on sign up. 	|
| password      	| string 	| PA55w0rD@123 	| Password chosen by the user on sign up. 	|

##### Response Parameters
| Parameters    	| Type   	| Example    	| Description                                                        	|
|---------------	|--------	|------------	|--------------------------------------------------------------------	|
| error         	| string 	| error_user 	| Indicate the error that occurred.<br>"OK" is returned if no error. 	|

##### Error Codes
| Error Code     	| Description                       	|
|----------------	|-----------------------------------	|
| OK             	| No error detected.                	|
| error_user     	| Invalid username and/or password. 	|

## Signup API
`api/signup`

Use this API to allow user signup. <br>

##### Request Parameters
| Parameters 	| Type   	| Example       	| Description                         	|
|------------	|--------	|---------------	|-------------------------------------	|
| username   	| string 	| Neo-Zenith    	| New user choice of unique username. 	|
| email      	| string 	| abc@gmail.com 	| New user's email address.           	|
| password   	| string 	| PA55w0rD@123  	| New user choice of password.        	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                        	|
|------------	|--------	|------------------	|--------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error. 	|

##### Error Codes
| Error Code             	| Description                                                                                                                                                                                              	|
|------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| OK                     	| No error detected.                                                                                                                                                                                       	|
| error_user_taken       	| Username has been taken.                                                                                                                                                                                 	|
| error_user_invalid     	| Username length is less than 5.                                                                                                                                                                          	|
| error_email_taken      	| Email has been taken.                                                                                                                                                                                    	|
| error_email_invalid    	| Email length is less than 5.                                                                                                                                                                             	|
| error_password_invalid 	| Password does not meet requirement of:<ul> <li> Minimum 8 characters </li> <li> Minimum 1 upper and 1 lower case characters </li> <li> Minimum 1 digit </li> <li> Minimum 1 special character </li> <ul> 	|
  
## Authenticate API
`api/authenticate`

Use this API to authenticate user on sign up. <br>
  
##### Request Parameters
| Parameters 	| Type   	| Example  	| Description                                    	|
|------------	|--------	|----------	|------------------------------------------------	|
| last_code  	| string 	| 10908092 	| 8-digit code sent to the user's email address. 	|
  
##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
| user       	| string 	| Neo-Zenith       	| Username of the user who successfully completed the authentication. 	|
  
##### Error Codes
| Error Code       	| Description                                   	|
|------------------	|-----------------------------------------------	|
| OK               	| No error detected.                            	|
| error_invalidOTP 	| Invalid OTP entered by the user.              	|

## Accounts API
`api/accounts`

Use this API to view user account information. <br>

##### Request Parameters
| Parameters 	| Type   	| Example    	| Description           	|
|------------	|--------	|------------	|-----------------------	|
| username   	| string 	| Neo-Zenith 	| Username of the user. 	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                             	|
|------------	|--------	|------------------	|-------------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.      	|
| username   	| string 	| Neo-Zenith       	| Username of the user.                                                   	|
| email      	| string 	| abc@gmail.com    	| Email of the user.                                                      	|
| name       	| string 	| John Doe         	| Name of the user.<br>Default is empty string until user changes it.     	|
| birthday   	| string 	| 2002-01-15       	| Birthday of the user.<br>Default is empty string until user changes it. 	|
  
##### Error Codes
| Error Code         	| Description                                   	|
|--------------------	|-----------------------------------------------	|
| OK                 	| No error detected.                            	|
| error_user_invalid 	| User not found.                               	|
| error_not_auth     	| User is not authorised to access the content. 	|
  
## Edit Accounts API
`api/accounts/edit`

Use this API to edit user account information. <br>

##### Request Parameters
| Parameters 	| Type   	| Example          	| Description                                                             	|
|------------	|--------	|------------------	|-------------------------------------------------------------------------	|
| username   	| string 	| Neo-Zenith       	| Username of the user.                                                   	|
| email      	| string 	| abc@gmail.com    	| Email of the user.                                                      	|
| name       	| string 	| John Doe         	| Name of the user.<br>Default is empty string until user changes it.     	|
| birthday   	| string 	| 2002-01-15       	| Birthday of the user.<br>Default is empty string until user changes it. 	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                             	|
|------------	|--------	|------------------	|-------------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.      	|
  
##### Error Codes
| Error Code        	| Description                  	|
|-------------------	|------------------------------	|
| OK                	| No error detected.           	|
| error_user_taken  	| New username has been taken. 	|
| error_email_taken 	| New email has been taken.    	|
  
## Check User Auth Status API
`api/accounts/authenticate`

Use this API to check user's auth status. <br>
  
##### Request Parameters
| Parameters 	| Type   	| Example    	| Description           	|
|------------	|--------	|------------	|-----------------------	|
| username   	| string 	| Neo-Zenith 	| Username of the user. 	|
  
##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
  
##### Error Codes
| Error Code       	| Description                                   	|
|------------------	|-----------------------------------------------	|
| OK               	| No error detected.                            	|
| error_not_auth   	| User is not authorised to access the content. 	|
| error_user_invalid 	| User not found.                               	|
  
## Logout API
`api/accounts/logout`

Use this API to logout a user. <br>
  
##### Request Parameters
| Parameters 	| Type   	| Example    	| Description           	|
|------------	|--------	|------------	|-----------------------	|
| username   	| string 	| Neo-Zenith 	| Username of the user. 	|
  
##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
  
##### Error Codes
| Error Code         	| Description                                   	|
|--------------------	|-----------------------------------------------	|
| OK                 	| No error detected.                            	|
| error_user_invalid 	| User not found.                               	|
| error_not_auth     	| User is not authorised to access the content. 	|

## Wishlist API
`api/accounts/wishlist`

Use this API to view a user's wishlist. <br>
  
##### Request Parameters
| Parameters 	| Type   	| Example    	| Description           	|
|------------	|--------	|------------	|-----------------------	|
| user       	| string 	| Neo-Zenith 	| Username of the user. 	|
  
##### Response Parameters
| Parameters 	| Type                	| Example                                                                                                                                                                                                                                                                                                                                                	| Description                                                                          	|
|------------	|---------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------	|
| error      	| string              	| error_user_taken                                                                                                                                                                                                                                                                                                                                       	| Indicate the error that occurred.<br>"OK" is returned if no error.                   	|
| payload    	| array of dictionary 	| <pre><br>[<br> {<br>   id: 1,<br>   item_name: Ryzen 5 5600X,<br>   user: Neo-Zenith,<br>   purchasable: True,<br>   added_at: 2022-09-29 08:45:23.225254,<br>   session_key: 1xtipi2ygrkzgjqr75p80u5m7m101t9w,<br>   platform: Lazada,<br>   url: https://www.lazada.sg/products/amd-ryzen-5-5600x-i1471660386-s6835772800.html,<br> }<br>]<br></pre> 	| An array of dictionary. Each dictionary contains information about a wish list item. 	|
  
##### Error Codes
| Error Code             	| Description                           	|
|------------------------	|---------------------------------------	|
| OK                     	| No error detected.                    	|
| error_wishlist_invalid 	| User has no wish list item added yet. 	|
