(defproject pedestal-svc "1.0.0"
  :dependencies [[org.clojure/clojure "1.12.0"]
                 [io.pedestal/pedestal.service "0.7.0"]
                 [io.pedestal/pedestal.jetty "0.7.0"]
                 [ch.qos.logback/logback-classic "1.5.12"]
                 [cheshire "5.13.0"]]
  :main ^:skip-aot pedestal-svc.service
  :profiles {:uberjar {:aot :all}})
