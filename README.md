
![image](https://user-images.githubusercontent.com/65043256/229349335-f273844c-df1b-447e-a08b-ec9fbb802f8c.png)

# Veterinary application - Pawcients

This project consists in the developement of a system that allows a veterinarians, auxiliaries and customers to manage actions related to expedients, appointments and the mascots of the latter.

## Functional Requirements
- Sign up and login of veterinarians and auxiliaries.
- Permission management.
- Customer registration and deletion by veterinarians and authorized personnel.
- Creation, access, modification and removal of medical records.
- Management and cancelation of appointments by customers
- Payment procedures.
- Customers personal info edition.
- Animal search by microchip (Provided we are allowed to access the required API)
- Online chat with veterinarians.
- SMS alert services to remind customers of near appointments.

## Non-functional Requirements:
- Security: Authentication and authorization of users through JWT, 2FA and email verification.
- Technologies utilized: Java, Spring Boot, Hibernate, React, React router, Javascript, CSS, HTML, Parcel, MySQL or MongoDB.
- Deployment: Docker, VM (Liceu's LXC), Netlify, Bind9, Apache.

## Architecture design
  To develop this project, it will be used the Client-Server archetype, using a VCM pattern. 

  On server side it will be used Java, Spring Boot, Hibernate and JWT to create the bussiness logic and security.

  To store information it will be used a MySQL or MongoDB.
  
  Client side it will be used React, React Router, Javascript, CSS and HTML to implement the user's interface. Parcel will be used as bundler to ease web deployment.
  
  For security reasons JSON Web Token will be utilized to secure http communications and 2 Factor Authentication will be implemented alongside email verification.
 
  To deploy the app's back will be used Docker and Netlify. Bind and apache will be used to realize the configuration and deployment of the app.
