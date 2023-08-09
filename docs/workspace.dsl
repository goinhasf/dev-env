workspace {

    model {
        user = person "User" "A user of my software system."
        softwareSystem = softwareSystem "Modern Parking System" "Modern Parking System" {
          ui = container "User interface" "Provides users with access to a subset of the parking system functionality" "Typescript (React)" "Web browser"

          eventStore = container "Event Store" {
            technology "EventStoreDB"
            registerStream = component "Register messages stream" {
              description "Stream holding registration events"
            }
          }

          register = container "Register" {
            registerApi = component "Register API" {
              description "Provides functionality for registering car park visits"
              technology "JVM - Scala 3"
            }

            registerApi -> registerStream 
          }

          availability = container "Availability" {
            description "Provides functionality relating to the capacity of the car park"
            availabilityApi = component "Availability API"
            availabilityConsumer = component "Consumer" "Consumer register data"
            availabilityView = component "Availability View" {
              description "Store containing a materialised view of the car park availability"
            }

            availabilityConsumer -> registerStream
            availabilityConsumer -> availabilityView

            availabilityApi -> availabilityView
          }

          api = container "Internal API" "Provides Modern Parking functionality via a Rest API" {
            booking = component "Bookings" "Provides the system with car park bookings"
            payment = component "Payments" "Enables car park billing and payments"
            users = component "Users" "Provides user functionality to other components"
          }

          database = container "Database"
          booking -> users
          payment -> users
          ui -> api
          api -> database
        }

        user -> softwareSystem "Uses"
    }

    views {
        systemContext softwareSystem "SystemContext" {
          include *
          autoLayout
        }
        
        container softwareSystem "Containers" {
          include *
          autoLayout
        } 

        component register "RegisterServiceComponents" {
          include *
          autoLayout
        }

        component availability "AvailabilityServiceComponents" {
          include *
          autoLayout 
        }

        component api "InternalApiComponents" {
          include *
          autoLayout
        }

        styles {
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Person" {
                shape person
                background #08427b
                color #ffffff
            }
        }
    }
    
}