import { Builder, By, until } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";

const rootURL = "http://localhost:3000";
let driver;

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElemntByClassName = async (driver, className, timeout = 2000) => {
  const el = await driver.wait(
    until.elementLocated(By.className(className)),
    timeout
  );
  return await driver.wait(until.elementIsVisible(el), timeout);
};

beforeEach(done => {
  driver = new Builder().forBrowser("chrome").build();
  driver.get(rootURL).then(done);
});
afterEach(done => {
  driver.quit().then(done);
});

it("initialises the context", async () => {
  await driver
    .manage()
    .window()
    .setPosition(0, 0);
  await driver
    .manage()
    .window()
    .setSize(1280, 1024);
  await driver.get(rootURL);
});

it("should click on navbar button to display a drawer", async () => {
  const el = await getElemntByClassName(driver, "App");
  const text = await el.getText();
  expect(text).toEqual("Hello, World");
});
