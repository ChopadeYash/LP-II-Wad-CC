import webapp2
import urllib2
import json


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('''
            <html>
            <body>
                <h2>Enter Zip Code and Branch Name:</h2>
                <form action="/postoffice" method="post">
                    <label for="zipcode">Zip Code:</label>
                    <input type="text" id="zipcode" name="zipcode" maxlength="6"><br><br>
                    <label for="branchname">Branch Name:</label>
                    <input type="text" id="branchname" name="branchname"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
            </html>
        ''')


class PostOfficeHandler(webapp2.RequestHandler):
    def post(self):
        zipcode = self.request.get('zipcode')
        branchname = self.request.get('branchname')

        if len(zipcode) != 6 or not zipcode.isdigit():
            self.response.write('''
                <html>
                <body>
                    <h2>Error: Invalid Zip Code</h2>
                    <p>Please enter a valid 6-digit zip code.</p>
                    <a href="/">Go back</a>
                </body>
                </html>
            ''')
            return

        api_url = 'http://www.postalpincode.in/api/pincode/{0}'.format(zipcode)
        response = urllib2.urlopen(api_url)
        data = json.load(response)

        if data['Status'] != 'Success':
            self.response.write('''
                <html>
                <body>
                    <h2>Error: {0}</h2>
                    <p>An error occurred while fetching post office details.</p>
                    <a href="/">Go back</a>
                </body>
                </html>
            '''.format(data[0]['Message']))
        else:
            postoffices = data['PostOffice']

            table = '''
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Branch Type</th>
                        <th>Delivery Status</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Circle</th>
                    </tr>
            '''

            for office in postoffices:
                table += '''
                    <tr>
                        <td>{0}</td>
                        <td>{1}</td>
                        <td>{2}</td>
                        <td>{3}</td>
                        <td>{4}</td>
                        <td>{5}</td>
                    </tr>
                '''.format(office['Name'], office['BranchType'], office['DeliveryStatus'], office['District'], office['State'], office['Circle'])

            table += '</table>'

            self.response.write('''
                <html>
                <body>
                    <h2>Nearest Post Office Details</h2>
                    <p>Zip Code: {0}</p>
                    <p>Branch Name: {1}</p>
                    <h3>Post Office Details:</h3>
                    {2}
                    <br>
                    <a href="/">Go back</a>
                </body>
                </html>
            '''.format(zipcode, branchname, table))


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/postoffice', PostOfficeHandler)
], debug=True)
