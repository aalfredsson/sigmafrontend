# sigma_front-end
Sigma Front-End Webbapp

INTRODUCTION
-----------------------------------------------------------------------------------------------------------------------------------------
The webapplication displays the dashboard where all the sensors in Sigma’s building can be monitored. All offline and online devices are shown on the dashboard and there is also a floorplan, which shows where every sensor is located in Sigma’s building. The device-specific information contains signal strength, battery strength and when the data was last polled for all the sensors. The device-specific site also contains graphs of the above-mentioned attributes and the location of the sensors on Sigma’s floorplan.

(http://intelligentmonitoringwebapp.azurewebsites.net/)


REQUIREMENTS
------------------------------------------------------------------------------------------------------------------------------------------
The webapplication requires the following module:
Node.js (https://nodejs.org/en/)


INSTALLATION
------------------------------------------------------------------------------------------------------------------------------------------
The following modules and frameworks are not neccessary for installing the webapplication but these are the components that were used during the development of the application:

-Angular 2 with TypeScript
-Bootstrap
-D3.js
-Tablesorter.js

First step of installing the webapplication is to open the directory where the src-file lies. Then you copy the path to the src file and open your commando prompt. In your commando prompt you write ’’cd’’ and then paste the path that you copied. Now you will be in the src-file through the command prompt. Write ’’npm install’’ to install all the modules listed as dependencies in package.json-file. After the installation, write ’’npm start’’ to start the webapplication. 

Problems that can arise during the installation in the command prompt are modules that are not recognized and these modules can be lite-server, concurrency and tsc. To solve these problems you can manually install every module by writing ’’npm install -g” and then write the module that is not recognized by the command prompt.
