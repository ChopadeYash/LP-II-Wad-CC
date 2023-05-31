import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        name, rollno, department="Yash Chopade", "T190058545", "Information Technology"

        # self.response.write("Hello World")

        for x in range(0,5):
            self.response.write("Name: {}<br>Roll No: {}<br>Department: {}<br><br>".format(name, rollno, department))


app = webapp2.WSGIApplication([('/',MainPage)],debug=True )

