# FindR API Endpoints Documentation
FindR APIs are built using using the [Django REST framework](https://www.django-rest-framework.org). 

## Login API
`api/v1/accounts/login`

Use this API to allow user login. <br>

<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Response Parameters
| Parameters 	| Type   	| Example              	| Description                                                                                                 	|
|------------	|--------	|----------------------	|-------------------------------------------------------------------------------------------------------------	|
| error      	| string 	| error_user_has_login 	| Indicate the error that occurred.<br>"OK" is returned if no error.                                          	|
| username   	| string 	| Neo-Zenith           	| Username if the user was previously authenticated.<br>This field will not be returned if error is not "OK". 	|

##### Error Codes
| Error Code           	| Description                        	|
|----------------------	|------------------------------------	|
| OK                   	| No error detected.                 	|
| error_user_has_login 	| User has previously authenticated. 	|

<img src="https://img.shields.io/badge/POST-800020?style=for-the-badge" />

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
`api/v1/accounts/signup`

Use this API to allow user signup. <br>

<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Response Parameters
| Parameters 	| Type   	| Example              	| Description                                                                                                 	|
|------------	|--------	|----------------------	|-------------------------------------------------------------------------------------------------------------	|
| error      	| string 	| error_user_has_login 	| Indicate the error that occurred.<br>"OK" is returned if no error.                                          	|
| username   	| string 	| Neo-Zenith           	| Username if the user was previously authenticated.<br>This field will not be returned if error is not "OK". 	|

##### Error Codes
| Error Code           	| Description                        	|
|----------------------	|------------------------------------	|
| OK                   	| No error detected.                 	|
| error_user_has_login 	| User has previously authenticated. 	|

<img src="https://img.shields.io/badge/POST-800020?style=for-the-badge" />

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
  
## Email Authenticate API
`api/v1/accounts/signup/authenticate`

Use this API to authenticate user on sign up. <br>
  
<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Query Parameters
| Parameters 	| Type   	| Example  	      | Description                  	|
|------------	|--------	|---------------	|-----------------------------	|
| email     	| string 	| abc@gmail.com 	| Email of user during signup. 	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
  
##### Error Codes
| Error Code       	| Description                                   	|
|------------------	|-----------------------------------------------	|
| OK               	| No error detected.                            	|
| error_not_auth    | User is not authorised to access the content. 	|

<img src="https://img.shields.io/badge/POST-800020?style=for-the-badge" />

##### Request Parameters
| Parameters 	| Type   	| Example  	| Description                                    	|
|------------	|--------	|----------	|------------------------------------------------	|
| code      	| string 	| 10908092 	| 8-digit code sent to the user's email address. 	|
  
##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_invalidOTP 	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
| user       	| string 	| Neo-Zenith       	| Username of the user who successfully completed the authentication. <br> This field will not be returned if error is not "OK"	|
  
##### Error Codes
| Error Code       	| Description                                   	|
|------------------	|-----------------------------------------------	|
| OK               	| No error detected.                            	|
| error_invalidOTP 	| Invalid OTP entered by the user.              	|

## Accounts Overview API
`api/v1/accounts`

Use this API to view user account information. <br>

<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Query Parameters
| Parameters 	| Type   	| Example  	      | Description                  	|
|------------	|--------	|---------------	|-----------------------------	|
| username    | string 	| Neo-Zenith    	| Username of user.           	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                             	|
|------------	|--------	|------------------	|-------------------------------------------------------------------------	|
| error      	| string 	| error_not_auth  	| Indicate the error that occurred.<br>"OK" is returned if no error.      	|
| username   	| string 	| Neo-Zenith       	| Username of the user. <br> This field will not be returned if error is not "OK". |
| email      	| string 	| abc@gmail.com    	| Email of the user. <br> This field will not be returned if error is not "OK". |
| name       	| string 	| John Doe         	| Name of the user.<br>Default is empty string until user changes it. <br> This field will not be returned if error is not "OK". |
| birthday   	| string 	| 2002-01-15       	| Birthday of the user.<br>Default is empty string until user changes it. <br> This field will not be returned if error is not "OK". |
  
##### Error Codes
| Error Code         	| Description                                   	|
|--------------------	|-----------------------------------------------	|
| OK                 	| No error detected.                            	|
| error_not_auth     	| User is not authorised to access the content. 	|
  
## Edit Accounts API
`api/v1/accounts/edit`

Use this API to edit user account information. <br>

<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Query Parameters
| Parameters 	| Type   	| Example  	      | Description                  	|
|------------	|--------	|---------------	|-----------------------------	|
| username    | string 	| Neo-Zenith    	| Username of user.           	|

##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                             	|
|------------	|--------	|------------------	|-------------------------------------------------------------------------	|
| error      	| string 	| error_user_taken 	| Indicate the error that occurred.<br>"OK" is returned if no error.      	|

##### Error Codes
| Error Code         	| Description                                   	|
|--------------------	|-----------------------------------------------	|
| OK                 	| No error detected.                            	|
| error_not_auth     	| User is not authorised to access the content. 	|

<img src="https://img.shields.io/badge/POST-800020?style=for-the-badge" />

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
  
## Logout API
`api/v1/accounts/logout`

Use this API to logout a user. <br>
  
<img src="https://img.shields.io/badge/POST-800020?style=for-the-badge" />
  
##### Response Parameters
| Parameters 	| Type   	| Example          	| Description                                                         	|
|------------	|--------	|------------------	|---------------------------------------------------------------------	|
| error      	| string 	| error_not_auth   	| Indicate the error that occurred.<br>"OK" is returned if no error.  	|
  
##### Error Codes
| Error Code         	| Description                                   	|
|--------------------	|-----------------------------------------------	|
| OK                 	| No error detected.                            	|
| error_not_auth     	| User is not authorised to access the content. 	|

## Wishlist API
`api/accounts/wishlist`

Use this API to view a user's wishlist. <br>

<img src="https://img.shields.io/badge/GET-097969?style=for-the-badge" />

##### Query Parameters
| Parameters 	| Type   	| Example  	      | Description                  	|
|------------	|--------	|---------------	|-----------------------------	|
| username    | string 	| Neo-Zenith    	| Username of user.           	|
  
##### Response Parameters
| Parameters 	| Type                	| Example                                                                                                                                                                                                                                                                                                                                                	| Description                                                                                                                                   	|
|------------	|---------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------	|
| error      	| string              	| error_user_taken                                                                                                                                                                                                                                                                                                                                       	| Indicate the error that occurred.<br>"OK" is returned if no error.                                                                            	|
| payload    	| array of dictionary 	| <pre><br>[<br> {<br>   id: 1,<br>   item_name: Ryzen 5 5600X,<br>   user: Neo-Zenith,<br>   purchasable: True,<br>   added_at: 2022-09-29 08:45:23.225254,<br>   session_key: 1xtipi2ygrkzgjqr75p80u5m7m101t9w,<br>   platform: Lazada,<br>   url: https://www.lazada.sg/products/amd-ryzen-5-5600x-i1471660386-s6835772800.html,<br> }<br>]<br></pre> 	| An array of dictionary. Each dictionary contains information about a wish list item.<br>This field will not be returned if error is not "OK". 	|
  
##### Error Codes
| Error Code             	| Description                           	|
|------------------------	|---------------------------------------	|
| OK                     	| No error detected.                    	|
| error_wishlist_invalid 	| User has no wish list item added yet. 	|
