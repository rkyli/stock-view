#stock-view

Demo:




https://user-images.githubusercontent.com/33162141/154004285-4852bb2c-eb0c-4321-a15e-cb9697c9abc2.MOV





----------------------------------
Installation (Mac):

Prerequisites: 
```
 brew install node
 brew install cocoapods
```

1. Run ```npm install``` to install all dependencies used by this project

2. Browse to /ios directory, and run ```pod install```to install the dependencies defined in the Podfile in the Xcode project foler.

3. Go back to the root directory, run ```npx react-native run-ios```


----------------------------------
Issue encountered when building react-native (iOS):

1. Stuck in Installing Flipper-Glog (0.3.6):

 Solution: comment out flipper part in Podfile
```
  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable these next few lines.
  # use_flipper!
  # post_install do |installer|
  #   flipper_post_install(installer)
  # end
end
```
2. Stuck in Installing glog (0.3.5):

Solution: 
```
sudo xcode-select --switch /Applications/Xcode.app
cd ios && pod install
```

3. Some error messages , app-registry..XXXX

Solution : clear cache => ```npm start -- --reset-cache```


----------------------------------
Planning:

Although I am more familiar with Angular, I have chosen React Native rather than Ionic due to its better performance. React native uses dynamic runtime, and it can be built to iOS or Android native apps. It also provides more flexibility with different libraries supported by the community.

After choosing the platform, I will go on to choose the libraries and packages that are suitable for the project. As suggested, I used Firebase , a Backend as a Service that handles authentication , data storage and hosting. I have allowed email-password authentication , as well as phone authentication (not implemented due to time constraints) in the Firebase console. For data storage, I used firestore to store users' watchlist.

As for the frontend libaries, I have chosen react-native-elements for better handling of the input and layout. For example, Input in react-native-element is handy as I can easily add left-icon / right-icon to the input element. For navigation, I used react-navigation, in particular, stack navigation, so that we can browse back and forth easily within the application. As for the stock graphs, I have chosen Victory Chart as it is easy to use and fully documented. There are gallaries showing different chart implementations in the official website which are easy to follow.

As for the API management, I have created a .env file to store the API endpoints and API keys for the application. I have used Alpha Vantage API for searching stock symbols, fetching stock information and time series data. As for searching stock news, I used Marketaux API by providing relevant stock symbol.
Since those APIs have call limit for freemium plan, I have also created a folder named "mockData" to store some static JSON files for testing. Once the UI design and the coding logic are implemented, I can test the real API calls to prevent wasting the call quota.

As for the development, I will prioritize the features as to provide the basic functionality first. Therefore, I will go for basic authentication (email & password) first. Then, the search and view function for financial instruments are of paramount importance to meet the requirements. Next, it will be the price data and stock graph. I chose the historical price data in different intervals together with the stock graph display, as real time data handling is more complicated. Then, the search function for stock news is implemented. FInally, I connect the application to firestore and add a star icon for the stock details page. When the user clicks on the star icon, it adds / removes the stock from the watchlist.
The watchlist is located below the stock search bar. When the user clicks the item in the watchlist, the application redirects to the stock detail page.
