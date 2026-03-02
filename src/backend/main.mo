import Text "mo:core/Text";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Map "mo:core/Map";
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

  let vehicles = Map.empty<Nat, Vehicle>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let quoteRequests = Map.empty<Nat, QuoteRequest>();
  let appointmentBookings = Map.empty<Nat, AppointmentBooking>();
  let franchiseApplications = Map.empty<Nat, FranchiseApplication>();
  let newsletterSubscribers = Map.empty<Nat, NewsletterSubscriber>();
  let vehicleEnquiries = Map.empty<Nat, VehicleEnquiry>();

  var nextVehicleId = 1;
  var nextBlogPostId = 1;
  var nextContactSubmissionId = 1;
  var nextQuoteRequestId = 1;
  var nextAppointmentBookingId = 1;
  var nextFranchiseApplicationId = 1;
  var nextNewsletterSubscriberId = 1;
  var nextVehicleEnquiryId = 1;
  var initialized = false;

  // Submission Functions
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

  // Vehicle Functions
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

  // Blog Functions
  public query ({ caller }) func getAllPublishedBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().values().filter(func(p) { p.is_published }).toArray().sort();
  };

  public query ({ caller }) func getBlogPostBySlug(slug : Text) : async BlogPost {
    switch (blogPosts.values().toArray().values().find(func(p) { p.slug == slug })) {
      case (null) { Runtime.trap("Blog post does not exist") };
      case (?post) { post };
    };
  };

  // Seed Data
  public shared ({ caller }) func seedData() : async () {
    if (initialized) { Runtime.trap("Data has already been initialized.") };

    // Vehicles
    let vehicleList = List.fromArray<Vehicle>([
      {
        id = nextVehicleId;
        name = "Green Scooter X1";
        brand = "ElectroMotors";
        category = "Scooter";
        range_km = 80;
        top_speed = 45;
        battery_kwh = 2.5;
        charging_hours = 4.5;
        price_min = 75000;
        price_max = 90000;
        motor_watts = 1200;
        brakes = "Disc";
        suspension = "Front Telescopic";
        warranty = "2 Years";
        description = "A compact yet powerful electric scooter for city commute.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 1;
        name = "Urban Rider";
        brand = "EcoWheels";
        category = "E-Bike";
        range_km = 120;
        top_speed = 25;
        battery_kwh = 1.2;
        charging_hours = 3.0;
        price_min = 50000;
        price_max = 60000;
        motor_watts = 500;
        brakes = "V-Brakes";
        suspension = "Front Suspension";
        warranty = "1 Year";
        description = "Perfect for daily commutes and urban exploration.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 2;
        name = "Eco Cruiser";
        brand = "VoltCycle";
        category = "Bike";
        range_km = 100;
        top_speed = 60;
        battery_kwh = 3.0;
        charging_hours = 5.0;
        price_min = 95000;
        price_max = 110000;
        motor_watts = 1500;
        brakes = "Disc";
        suspension = "Dual Suspension";
        warranty = "3 Years";
        description = "A robust bike designed for performance and comfort.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 3;
        name = "City Glide";
        brand = "Green Motors";
        category = "Scooter";
        range_km = 70;
        top_speed = 40;
        battery_kwh = 2.0;
        charging_hours = 4.0;
        price_min = 70000;
        price_max = 85000;
        motor_watts = 1000;
        brakes = "Drum";
        suspension = "Hydraulic";
        warranty = "2 Years";
        description = "Smooth and silent scooter for daily errands.";
        is_featured = false;
      },
      {
        id = nextVehicleId + 4;
        name = "Power Trekker";
        brand = "eBikePro";
        category = "Electric Bike";
        range_km = 150;
        top_speed = 35;
        battery_kwh = 2.8;
        charging_hours = 4.2;
        price_min = 80000;
        price_max = 95000;
        motor_watts = 750;
        brakes = "Disc + V-Brake";
        suspension = "Full Suspension";
        warranty = "2 Years";
        description = "Efficient and high-performing electric bike for all terrains.";
        is_featured = true;
      },
      {
        id = nextVehicleId + 5;
        name = "Swift Commuter";
        brand = "VoltCycle";
        category = "E-Bike";
        range_km = 110;
        top_speed = 22;
        battery_kwh = 1.8;
        charging_hours = 3.5;
        price_min = 52000;
        price_max = 58000;
        motor_watts = 350;
        brakes = "V-Brakes";
        suspension = "Front Fork";
        warranty = "1 Year";
        description = "Secure and comfortable ride for everyday use.";
        is_featured = false;
      },
    ]);

    for (vehicle in vehicleList.values()) {
      vehicles.add(vehicle.id, vehicle);
      nextVehicleId += 1;
    };

    // Blog Posts
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
      nextBlogPostId += 1;
    };

    initialized := true;
  };
};
