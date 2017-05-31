# INTRODUCTION
The webapplication displays the dashboard where all the sensors in Sigma’s building can be monitored. All offline and online devices are shown on the dashboard and there is also a floorplan, which shows where every sensor is located in Sigma’s building. The device-specific information contains signal strength, battery strength and when the data was last polled for all the sensors. The device-specific site also contains graphs of the above-mentioned attributes and the location of the sensors on Sigma’s floorplan.

[Live version](http://intelligentmonitoringwebapp.azurewebsites.net/)


## REQUIREMENTS
The webapplication requires the following module:

[Node.js](https://nodejs.org/en/)

## INSTALLATION
The following modules and frameworks are not neccessary for installing the webapplication but these are the components that were used during the development of the application:

[Angular 2 with TypeScript](https://angular.io)

[Bootstrap](http://getbootstrap.com)

[D3.js](https://d3js.org)

[Tablesorter.js](http://tablesorter.com/docs/)

First step of installing the webapplication is to open the directory where the src-file lies. Then you copy the path to the src file and open your commando prompt. In your commando prompt you write ’’cd’’ and then paste the path that you copied. Now you will be in the src-file through the command prompt. Write: 
```
$ npm install
```
to install all the modules listed as dependencies in package.json-file. After the installation, write: 

```
$ npm start
```

to start the webapplication. 

## Troubleshooting
Problems that can arise during the installation in the command prompt are modules that are not recognized and these modules can be lite-server, concurrency and tsc. To solve these problems you can manually install every module by writing: 
```
npm install -g
```

and then write the module that is not recognized by the command prompt.

**Cross-origin:**
To be able to connect while using localhost you will need to either include your domain name on your web server's CORS settings or download a plug-in/use developer tools to deactivate limitations to Cross Origin.

## Deploy on web (web.config)
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <clear />
                <rule name="AngularJS Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```
