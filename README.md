# SELFAPP 2020

## Description
Selfapp is an application project inspired by social media like Facebook and Instagram.
Users can upload their pictures with certain date and caption for each photo and see it in generated timeline. 
There is no interaction between users. Every single person registered in selfapp can upload pictures for himself/herself
and treat this data as sort of personal album filled with memories.

## Running the application
Application by default is set to a production mode. 
To start the app run the command `docker-compose up` and go to `http://127.0.0.1:8899/selfapp/` in your browser. 

## Endpoints
The application runs on `http://127.0.0.1:8899` by default.

URL | METHOD | PAYLOAD | RETURNED VALUE | DESCRIPTION | 
----|--------|---------|----------------|-------------|
/auth/token/ | POST | `username`: string, `password`: string | `access`: string, `refresh`: string | Generate JWT token to authenticate user. |
/auth/refresh/ | POST | `refresh`: string | `access`: string | Get another access token after the previous one got expired.
/auth/registration/ | POST | `first_name`: string, `last_name`: string, `email`: string, `password`: string, `repeat_password`: string | `ok`: string, `error`: string, `message`: string | Endpoint handles user registration. Returned value is either ok - registration successfull or error - registration failed. In any case there is also message - value to be displayed for the user.
/auth/user/ | GET | None | `name`: string, `profile_image`: string | Endpoint returns basic user data - name, surname and profile picture.
/auth/user/ | POST | `picture`: Image | `ok`: string, `error`: string, `message`: string | Endpoint updates a profile picture of the user.
/auth/user/ | PUT | `old_password`: string, `new_password`: string, `new_password_repeat`: string | `ok`: string, `error`: string, `message`: string | Endpoint handles password change.
/auth/user/ | DELETE | None | `ok`: string, `error`: string, `message`: string | Endpoint handles deleting user account.
/pictures/upload/ | GET | `page`:number | `lastPage`:number, `images`: list | Endpoint returns paginated list of pictures with captions and the date.
/pictures/upload/ | POST | `picture`: Image, `date`: Date, `caption`: string (optional) | `ok`: string, `message`: string, `error`: string | Endpoint handles uploading pictures by users.
/pictures/upload/ | DELETE | `picture_id`: string | `ok`: string, `message`: string, `error`: string | Endpoint removes a picture with given id.
/pictures/dashboard/ | GET | None | `no_pictures`: boolean, `picture`: object | Endpoint returns dashboard data - in this case recently uploaded picture.
/pictures/media/images/`imagename: string` | GET | None | Image | Endpoint returns particular image.