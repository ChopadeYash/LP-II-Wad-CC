import webapp2

class Main(webapp2.RequestHandler):
    def get(self):

        while i < 10 :
            # self.response.write("Seat Number: T190058545 <br>")
            self.response.write("Seat Number: T190058545 <br>")
            self.response.write("Department: IT <hr>")
            i=i+1

app = webapp2.WSGIApplication(
    [
        ("/", Main)
    ]
)