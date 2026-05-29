cmake_minimum_required(VERSION 3.28)
project(drogon-app VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(POLICY CMP0153)
  cmake_policy(SET CMP0153 OLD)
endif()
find_package(Drogon REQUIRED)

add_executable(app main.cc)
target_link_libraries(app PRIVATE Drogon::Drogon)

enable_testing()
find_package(GTest)
if(GTest_FOUND)
  add_executable(health_test tests/health_test.cc)
  target_link_libraries(health_test PRIVATE Drogon::Drogon GTest::gtest_main)
  gtest_discover_tests(health_test)
endif()
