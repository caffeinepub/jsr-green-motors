import Text "mo:core/Text";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

actor {
  type Vehicle = {
    id : Nat;
    name : Text;
    brand : Text;
    category : Text;
    range_km : Nat;
    top_speed : Nat;
    battery_kwh : Float;
    charging_hours : Float;
    price_min : Nat;
    price_max : Nat;
    motor_watts : Nat;
    brakes : Text;
    suspension : Text;
    warranty : Text;
    description : Text;
    is_featured : Bool;
  };

  module Vehicle {
    public func compare(vehicle1 : Vehicle, vehicle2 : Vehicle) : Order.Order {
      Int.compare(vehicle1.id, vehicle2.id);
    };
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    tags : [Text];
    published_date : Time.Time;
    author : Text;
    is_published : Bool;
  };

  module BlogPost {
    public func compare(blogPost1 : BlogPost, blogPost2 : BlogPost) : Order.Order {
      Int.compare(blogPost1.id, blogPost2.id);
    };
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    submitted_at : Time.Time;
  };

  type QuoteRequest = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    vehicle_interest : Text;
    message : Text;
    submitted_at : Time.Time;
  };

  type AppointmentBooking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    service_type : Text;
    preferred_date : Text;
    preferred_time : Text;
    notes : Text;
    submitted_at : Time.Time;
  };

  type FranchiseApplication = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    state : Text;
    investment_capacity : Nat;
    message : Text;
    submitted_at : Time.Time;
  };

  type NewsletterSubscriber = {
    id : Nat;
    email : Text;
    subscribed_at : Time.Time;
  };

  type VehicleEnquiry = {
    id : Nat;
    vehicle_id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    message : Text;
    submitted_at : Time.Time;
  };

  type ConversionInquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    bike_model : Text;
    location : Text;
    petrol_expense : Text;
    submitted_at : Time.Time;
  };

  type CallbackRequest = {
    id : Nat;
    name : Text;
    phone : Text;
    city : Text;
    interest : Text;
    submitted_at : Time.Time;
  };

  let vehicles = Map.empty<Nat, Vehicle>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let quoteRequests = Map.empty<Nat, QuoteRequest>();
  let appointmentBookings = Map.empty<Nat, AppointmentBooking>();
  let franchiseApplications = Map.empty<Nat, FranchiseApplication>();
  let newsletterSubscribers = Map.empty<Nat, NewsletterSubscriber>();
  let vehicleEnquiries = Map.empty<Nat, VehicleEnquiry>();
  let conversionInquiries = Map.empty<Nat, ConversionInquiry>();
  let callbackRequests = Map.empty<Nat, CallbackRequest>();

  var nextVehicleId = 1;
  var nextBlogPostId = 1;
  var nextContactSubmissionId = 1;
  var nextQuoteRequestId = 1;
  var nextAppointmentBookingId = 1;
  var nextFranchiseApplicationId = 1;
  var nextNewsletterSubscriberId = 1;
  var nextVehicleEnquiryId = 1;
  var nextConversionInquiryId = 1;
  var nextCallbackRequestId = 1;
  var initialized = false;

  public shared ({ caller }) func addContactSubmission(name : Text, email : Text, phone : Text, message : Text) : async () {
    let id = nextContactSubmissionId;
    nextContactSubmissionId += 1;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      phone;
      message;
      submitted_at = Time.now();
    };
    contactSubmissions.add(id, submission);
  };

  public shared ({ caller }) func addQuoteRequest(name : Text, email : Text, phone : Text, vehicle_interest : Text, message : Text) : async () {
    let id = nextQuoteRequestId;
    nextQuoteRequestId += 1;
    let request : QuoteRequest = {
      id;
      name;
      email;
      phone;
      vehicle_interest;
      message;
      submitted_at = Time.now();
    };
    quoteRequests.add(id, request);
  };

  public shared ({ caller }) func addAppointmentBooking(name : Text, email : Text, phone : Text, service_type : Text, preferred_date : Text, preferred_time : Text, notes : Text) : async () {
    let id = nextAppointmentBookingId;
    nextAppointmentBookingId += 1;
    let booking : AppointmentBooking = {
      id;
      name;
      email;
      phone;
      service_type;
      preferred_date;
      preferred_time;
      notes;
      submitted_at = Time.now();
    };
    appointmentBookings.add(id, booking);
  };

  public shared ({ caller }) func addFranchiseApplication(name : Text, email : Text, phone : Text, city : Text, state : Text, investment_capacity : Nat, message : Text) : async () {
    let id = nextFranchiseApplicationId;
    nextFranchiseApplicationId += 1;
    let application : FranchiseApplication = {
      id;
      name;
      email;
      phone;
      city;
      state;
      investment_capacity;
      message;
      submitted_at = Time.now();
    };
    franchiseApplications.add(id, application);
  };

  public shared ({ caller }) func addNewsletterSubscriber(email : Text) : async () {
    let id = nextNewsletterSubscriberId;
    nextNewsletterSubscriberId += 1;
    let subscriber : NewsletterSubscriber = {
      id;
      email;
      subscribed_at = Time.now();
    };
    newsletterSubscribers.add(id, subscriber);
  };

  public shared ({ caller }) func addVehicleEnquiry(vehicle_id : Nat, name : Text, email : Text, phone : Text, city : Text, message : Text) : async () {
    let id = nextVehicleEnquiryId;
    nextVehicleEnquiryId += 1;
    let enquiry : VehicleEnquiry = {
      id;
      vehicle_id;
      name;
      email;
      phone;
      city;
      message;
      submitted_at = Time.now();
    };
    vehicleEnquiries.add(id, enquiry);
  };

  public shared ({ caller }) func addConversionInquiry(name : Text, phone : Text, bike_model : Text, location : Text, petrol_expense : Text) : async () {
    let id = nextConversionInquiryId;
    nextConversionInquiryId += 1;
    let inquiry : ConversionInquiry = {
      id;
      name;
      phone;
      bike_model;
      location;
      petrol_expense;
      submitted_at = Time.now();
    };
    conversionInquiries.add(id, inquiry);
  };

  public shared ({ caller }) func addCallbackRequest(name : Text, phone : Text, city : Text, interest : Text) : async () {
    let id = nextCallbackRequestId;
    nextCallbackRequestId += 1;
    let request : CallbackRequest = {
      id;
      name;
      phone;
      city;
      interest;
      submitted_at = Time.now();
    };
    callbackRequests.add(id, request);
  };

  public query ({ caller }) func getAllVehicles() : async [Vehicle] {
    vehicles.values().toArray().sort();
  };

  public query ({ caller }) func getVehiclesByCategory(category : Text) : async [Vehicle] {
    vehicles.values().toArray().values().filter(func(v) { v.category == category }).toArray().sort();
  };

  public query ({ caller }) func getFeaturedVehicles() : async [Vehicle] {
    vehicles.values().toArray().values().filter(func(v) { v.is_featured }).toArray().sort();
  };

  public query ({ caller }) func getVehicleById(id : Nat) : async Vehicle {
    switch (vehicles.get(id)) {
      case (null) { Runtime.trap("Vehicle does not exist") };
      case (?vehicle) { vehicle };
    };
  };

  public query ({ caller }) func getAllPublishedBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().values().filter(func(p) { p.is_published }).toArray().sort();
  };

  public query ({ caller }) func getBlogPostBySlug(slug : Text) : async BlogPost {
    switch (blogPosts.values().toArray().values().find(func(p) { p.slug == slug })) {
      case (null) { Runtime.trap("Blog post does not exist") };
      case (?post) { post };
    };
  };

  public shared ({ caller }) func seedData() : async () {
    if (initialized) { Runtime.trap("Data has already been initialized.") };

    let vehicleList = List.fromArray<Vehicle>([
      // Dynamo
      {
        id = nextVehicleId;
        name = "Lima";
        brand = "Dynamo";
        category = "Scooter";
        range_km = 100;
        top_speed = 55;
        battery_kwh = 2.5;
        charging_hours = 4.0;
        price_min = 80000;
        price_max = 90000;
        motor_watts = 1200;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Glide through city streets with unmatched style, ease, and comfort. The Dynamo Lima is designed for the modern urban commuter.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 1;
        name = "Flyer";
        brand = "Dynamo";
        category = "Scooter";
        range_km = 100;
        top_speed = 60;
        battery_kwh = 2.8;
        charging_hours = 4.5;
        price_min = 78000;
        price_max = 88000;
        motor_watts = 1500;
        brakes = "Disc";
        suspension = "Front Telescopic, Rear Hydraulic";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "The Dynamo Flyer is built for speed and style — everyday adventures with reliability and thrill.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 2;
        name = "RX1";
        brand = "Dynamo";
        category = "Scooter";
        range_km = 150;
        top_speed = 75;
        battery_kwh = 3.5;
        charging_hours = 5.0;
        price_min = 95000;
        price_max = 108000;
        motor_watts = 2000;
        brakes = "Dual Disc";
        suspension = "Front Upside-Down, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Experience sporty rides with a perfect blend of speed, style, and technology. The Dynamo RX1 is Dynamo`s performance flagship.";
        is_featured = true;
      },

      // OPG Mobility
      {
        id = nextVehicleId + 3;
        name = "FAAST F4";
        brand = "OPG Mobility";
        category = "Scooter";
        range_km = 162;
        top_speed = 70;
        battery_kwh = 4.4;
        charging_hours = 4.0;
        price_min = 109999;
        price_max = 120000;
        motor_watts = 3000;
        brakes = "Dual Disc with CBS";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "OPG FAAST F4 — the most powerful in the FAAST series with LFP battery, 162 km range and 70 kmph top speed.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 4;
        name = "FAAST F3";
        brand = "OPG Mobility";
        category = "Scooter";
        range_km = 130;
        top_speed = 70;
        battery_kwh = 3.53;
        charging_hours = 4.0;
        price_min = 104999;
        price_max = 115000;
        motor_watts = 2500;
        brakes = "Dual Disc";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "OPG FAAST F3 with LFP battery delivers 130 km range and 70 kmph — ideal for long-distance daily commuters.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 5;
        name = "DEFY 22";
        brand = "OPG Mobility";
        category = "Scooter";
        range_km = 100;
        top_speed = 70;
        battery_kwh = 2.5;
        charging_hours = 3.5;
        price_min = 99999;
        price_max = 110000;
        motor_watts = 2200;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "The DEFY 22 is OPG`s bold new entrant — sporty styling, LFP battery, 100 km range.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 6;
        name = "FREEDUM LI";
        brand = "OPG Mobility";
        category = "Scooter";
        range_km = 75;
        top_speed = 25;
        battery_kwh = 1.5;
        charging_hours = 3.0;
        price_min = 69999;
        price_max = 78000;
        motor_watts = 250;
        brakes = "Drum Front and Rear";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "FREEDUM LI — affordable low-speed LFP scooter for budget-conscious commuters who need reliability and range.";
        is_featured = false;
      },

      // Battre
      {
        id = nextVehicleId + 7;
        name = "ONE";
        brand = "Battre";
        category = "Scooter";
        range_km = 90;
        top_speed = 60;
        battery_kwh = 2.0;
        charging_hours = 3.5;
        price_min = 79999;
        price_max = 90000;
        motor_watts = 1500;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Batt:RE ONE — IP67 waterproof detachable battery, 90 km range and classic design. India`s stylish city commuter.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 8;
        name = "EPIC";
        brand = "Battre";
        category = "Scooter";
        range_km = 103;
        top_speed = 60;
        battery_kwh = 2.5;
        charging_hours = 3.0;
        price_min = 99999;
        price_max = 112000;
        motor_watts = 1500;
        brakes = "Disc";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Batt:RE EPIC — metal body, 103 km range, LCD screen and a premium look for riders who want style with substance.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 9;
        name = "Loev+";
        brand = "Battre";
        category = "Scooter";
        range_km = 132;
        top_speed = 60;
        battery_kwh = 3.2;
        charging_hours = 3.0;
        price_min = 114999;
        price_max = 128000;
        motor_watts = 1800;
        brakes = "Dual Disc";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Batt:RE Loev+ — metal body, 132 km range, 5-inch TFT Smart Bluetooth display. The premium flagship from Batt:RE.";
        is_featured = true;
      },

      // Revolt Motors
      {
        id = nextVehicleId + 10;
        name = "RV1";
        brand = "Revolt Motors";
        category = "Bike";
        range_km = 100;
        top_speed = 65;
        battery_kwh = 2.2;
        charging_hours = 2.25;
        price_min = 99999;
        price_max = 105000;
        motor_watts = 2800;
        brakes = "Disc Front and Rear";
        suspension = "Telescopic Fork, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Revolt RV1 — India`s most affordable electric motorcycle with 2.8 kW motor, 100 km range and MyRevolt app connectivity.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 11;
        name = "RV400";
        brand = "Revolt Motors";
        category = "Bike";
        range_km = 150;
        top_speed = 85;
        battery_kwh = 3.24;
        charging_hours = 3.5;
        price_min = 104990;
        price_max = 118000;
        motor_watts = 2800;
        brakes = "Dual Disc";
        suspension = "Telescopic Fork, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Revolt RV400 — India`s most award-winning electric motorcycle. 3.24 kWh battery, 150 km range, 80-minute fast charge.";
        is_featured = true;
      },

      // Kinetic Green
      {
        id = nextVehicleId + 12;
        name = "E-Luna X3 Prime";
        brand = "Kinetic Green";
        category = "Bike";
        range_km = 110;
        top_speed = 50;
        battery_kwh = 2.0;
        charging_hours = 4.0;
        price_min = 84290;
        price_max = 95000;
        motor_watts = 1200;
        brakes = "Drum Front and Rear";
        suspension = "Front Telescopic, Rear Dual Shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Kinetic Green E-Luna X3 Prime — modern take on the classic Luna with digital color cluster, LED headlamp and 110 km range.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 13;
        name = "E-Luna X2";
        brand = "Kinetic Green";
        category = "Bike";
        range_km = 80;
        top_speed = 45;
        battery_kwh = 1.8;
        charging_hours = 4.0;
        price_min = 69990;
        price_max = 80000;
        motor_watts = 1000;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Dual Shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Kinetic Green E-Luna X2 — the entry-level E-Luna. Affordable, practical and nostalgic.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 14;
        name = "E-Zulu";
        brand = "Kinetic Green";
        category = "Scooter";
        range_km = 100;
        top_speed = 55;
        battery_kwh = 2.5;
        charging_hours = 4.0;
        price_min = 79990;
        price_max = 90000;
        motor_watts = 1500;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Kinetic Green E-Zulu — sleek, powerful scooter with strong range and modern styling for city and suburban use.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 15;
        name = "Zoom";
        brand = "Kinetic Green";
        category = "Scooter";
        range_km = 70;
        top_speed = 45;
        battery_kwh = 1.8;
        charging_hours = 4.0;
        price_min = 70481;
        price_max = 80000;
        motor_watts = 1000;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "Kinetic Green Zoom — smart low-maintenance scooter for senior riders and short-trip commuters with 70 km range.";
        is_featured = false;
      },

      // Goeen
      {
        id = nextVehicleId + 16;
        name = "Chalo 1000 V2";
        brand = "Goeen";
        category = "Scooter";
        range_km = 100;
        top_speed = 55;
        battery_kwh = 2.2;
        charging_hours = 4.0;
        price_min = 85000;
        price_max = 98000;
        motor_watts = 1000;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "Goeen Chalo 1000 V2 — high-speed lithium scooter with 100 km range. The performance upgrade in the Chalo lineup.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 17;
        name = "Chalo Smart Pro";
        brand = "Goeen";
        category = "Scooter";
        range_km = 80;
        top_speed = 25;
        battery_kwh = 1.5;
        charging_hours = 4.0;
        price_min = 72000;
        price_max = 82000;
        motor_watts = 250;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "Goeen Chalo Smart Pro — feature-rich low-speed scooter with 80 km range and urban-friendly speed.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 18;
        name = "Chalo Smart Eco";
        brand = "Goeen";
        category = "Scooter";
        range_km = 130;
        top_speed = 25;
        battery_kwh = 2.5;
        charging_hours = 5.0;
        price_min = 68000;
        price_max = 78000;
        motor_watts = 250;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "Goeen Chalo Smart Eco — the longest-range low-speed scooter in the Goeen lineup. 130 km range for maximum efficiency.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 19;
        name = "NJA-7";
        brand = "Goeen";
        category = "Scooter";
        range_km = 130;
        top_speed = 25;
        battery_kwh = 2.5;
        charging_hours = 5.0;
        price_min = 70000;
        price_max = 80000;
        motor_watts = 250;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "Goeen NJA-7 — bold-styled low-speed scooter with 130 km range and rugged urban presence.";
        is_featured = false;
      },

      // iVOOMi
      {
        id = nextVehicleId + 20;
        name = "ZeetX ZE";
        brand = "iVOOMi";
        category = "Scooter";
        range_km = 100;
        top_speed = 60;
        battery_kwh = 2.5;
        charging_hours = 4.0;
        price_min = 88000;
        price_max = 100000;
        motor_watts = 2000;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Mono-shock";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "iVOOMi ZeetX ZE — smart, connected and powerful. The flagship scooter from iVOOMi with IoT features and strong city range.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 21;
        name = "S1 Lite";
        brand = "iVOOMi";
        category = "Scooter";
        range_km = 80;
        top_speed = 50;
        battery_kwh = 2.0;
        charging_hours = 4.0;
        price_min = 72000;
        price_max = 82000;
        motor_watts = 1500;
        brakes = "Disc Front, Drum Rear";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "3 Years Battery, 2 Years Motor";
        description = "iVOOMi S1 Lite — lightweight, efficient and affordable. A reliable everyday scooter with clean design.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 22;
        name = "Eco+";
        brand = "iVOOMi";
        category = "Scooter";
        range_km = 70;
        top_speed = 45;
        battery_kwh = 1.5;
        charging_hours = 3.5;
        price_min = 60000;
        price_max = 70000;
        motor_watts = 1200;
        brakes = "Drum";
        suspension = "Front Telescopic, Rear Spring";
        warranty = "2 Years Battery, 1 Year Motor";
        description = "iVOOMi Eco+ — the budget-friendly entry into electric mobility. Simple, practical and efficient for daily city use.";
        is_featured = false;
      },
    ]);

    for (vehicle in vehicleList.values()) {
      vehicles.add(vehicle.id, vehicle);
    };
    nextVehicleId += vehicleList.size();

    let blogPostList = List.fromArray<BlogPost>([
      {
        id = nextBlogPostId;
        title = "The Future of Electric Mobility";
        slug = "future-electric-mobility";
        excerpt = "Exploring innovations driving electric vehicle growth.";
        content = "Detailed analysis on electric mobility trends, technologies, and environmental impact.";
        category = "Trends";
        tags = ["future", "technology"];
        published_date = Time.now();
        author = "admin";
        is_published = true;
      },
      {
        id = nextBlogPostId + 1;
        title = "Government Incentives for EV Buyers";
        slug = "government-incentives-ev-buyers";
        excerpt = "Benefits of tax rebates for electric vehicle owners.";
        content = "Breakdown of current government rebates, subsidies, and how to claim incentives.";
        category = "Information";
        tags = ["government", "incentives"];
        published_date = Time.now();
        author = "admin";
        is_published = true;
      },
      {
        id = nextBlogPostId + 2;
        title = "Maintaining Your Electric Bike";
        slug = "maintaining-electric-bike";
        excerpt = "Tips to keep your electric bike performing at its best.";
        content = "Guidelines on battery care, troubleshooting, and preventive maintenance.";
        category = "Guides";
        tags = ["maintenance", "tips"];
        published_date = Time.now();
        author = "admin";
        is_published = false;
      },
      {
        id = nextBlogPostId + 3;
        title = "Comparing Electric Vehicles";
        slug = "comparing-electric-vehicles";
        excerpt = "Overview of different electric vehicle types.";
        content = "Comparative analysis of scooters, bikes, and e-bikes.";
        category = "Reviews";
        tags = ["comparison", "vehicles"];
        published_date = Time.now();
        author = "admin";
        is_published = true;
      },
    ]);

    for (post in blogPostList.values()) {
      blogPosts.add(post.id, post);
    };
    nextBlogPostId += blogPostList.size();

    initialized := true;
  };
};
